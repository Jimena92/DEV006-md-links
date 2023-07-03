const fs = require("fs");
const path = require("path");

// Función asincrónica para leer los links en un archivo Markdown
function readFileLinks(fileRoute) {
  return new Promise((resolve, reject) => {
    const links = [];
    fs.readFile(fileRoute, "utf8", (err, data) => {
      if (err) {
        reject(`Error al leer el archivo: ${err}`);
      } else {
        // Buscar URLs en el texto utilizando expresión regular
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const matches = data.match(urlRegex);
        if (matches) {
          matches.forEach((match) => {
            // Agregar cada URL encontrada a la lista de links
            links.push({ href: match, text: match, file: fileRoute });
          });
        }
        resolve(links);
      }
    });
  });
}

// Función asincrónica para buscar archivos Markdown en un directorio
async function searchMDFiles(input) {
  return new Promise((resolve, reject) => {
    if (typeof input !== "string") {
      reject("La ruta debe ser un string");
    }
    if (!path.isAbsolute(input)) {
      input = path.resolve(input);
    }

    // Verificar si el directorio existe
    fs.access(input, fs.constants.F_OK, (error) => {
      if (error) {
        reject(`${input} no existe`);
      } else {
        // Leer el contenido del directorio
        fs.readdir(input, (error, files) => {
          if (error) {
            reject(`Error al leer el directorio: ${error}`);
          } else {
            const markdownFiles = []; // Array para almacenar las rutas completas de los archivos Markdown encontrados
            const linksReadingPromises = []; // Array para almacenar las promesas generadas en el proceso de lectura de links

            // Recorrer los archivos en el directorio
            files.forEach((file) => {
              const completeRoute = path.join(input, file); // Construir la ruta completa del archivo o subdirectorio

              // Verificar si es un archivo y tiene extensión ".md" (Markdown)
              if (fs.statSync(completeRoute).isFile() && path.extname(file) === ".md") {
                markdownFiles.push(completeRoute); // Agregar la ruta completa del archivo Markdown al array 'markdownFiles'
                linksReadingPromises.push(readFileLinks(completeRoute)); // Agregar una nueva promesa de lectura de links al array 'linksReadingPromises'
              }
            });

            if (markdownFiles.length === 0) {
              reject("No se encontraron archivos Markdown");
            } else {
              // Ejecutar todas las promesas de lectura de links en paralelo
              Promise.all(linksReadingPromises)
                .then((results) => {
                  const links = results.flat(); // Aplanar el array de resultados de las promesas

                  if (links.length === 0) {
                    resolve("No se encontraron links en los archivos Markdown");
                  } else {
                    // Generar promesas para validar cada link utilizando fetch
                    const linkPromises = links.map((link) => {
                      return fetch(link.href)
                        .then((response) => {
                          // Asignar el estado y el texto del estado al objeto del link
                          link.status = response.status;
                          link.statusText = response.statusText;
                          return link;
                        })
                        .catch((error) => {
                          // En caso de error, asignar un estado y texto personalizado al objeto del link
                          link.status = "Error: No se pudo realizar la solicitud";
                          link.statusText = "";
                          return link;
                        });
                    });

                    // Ejecutar todas las promesas de validación de links en paralelo
                    Promise.all(linkPromises)
                      .then((validatedLinks) => {
                        resolve(validatedLinks); // Devolver los links validados
                      })
                      .catch((error) => reject(error));
                  }
                })
                .catch((error) => reject(error));
            }
          }
        });
      }
    });
  });
}

const inputPath = process.argv[2]; // Obtener la ruta del directorio desde la línea de comandos

// Buscar archivos Markdown y leer los links en paralelo
searchMDFiles(inputPath)
  .then((links) => {
    // Iterar sobre cada link y mostrar su información
    links.forEach((link) => {
      let statusText = "";

      // Determinar la leyenda del estado del link
      if (link.status === 200) {
        statusText = "Válido";
      } else if (link.status >= 400 && link.status < 600) {
        statusText = "Roto";
      } else {
        statusText = "Desconocido";
      }

      // Mostrar el link y su estado
      console.log(link);
      console.log(`Enlace: ${link.href} | Estado: ${link.status} - ${statusText}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });