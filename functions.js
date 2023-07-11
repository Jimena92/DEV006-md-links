const fs = require("fs");
const path = require("path");
const colors = require("ansi-colors");

// Función para leer los links en un archivo Markdown
function readFileLinks(fileRoute) {
  return new Promise((resolve, reject) => {
    const links = [];
    fs.readFile(fileRoute, "utf8", (err, data) => {
      if (err) {
        reject(`Error reading file: ${err}`);
      } else {
        // Buscar URLs en el texto utilizando expresión regular
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const matches = data.match(urlRegex);
        if (matches) {
          matches.forEach((match) => {
            // Agregar cada URL encontrada a la lista de links
            links.push({ href: match, file: fileRoute });
          });
        }
        resolve(links);
      }
    });
  });
}

// Función para validar un link utilizando fetch
function validateLink(link) {
  return fetch(link.href)
    .then((response) => {
      // Asignar el estado y el texto del estado al objeto del link
      link.status = response.status;
      link.statusText = response.statusText;

      if (response.ok) {
        link.ok = "ok"; // Mensaje de éxito
      } else {
        link.ok = "fail"; // Mensaje de fallo
      }

      // Retornar el objeto del link con los datos actualizados
      return link;
    })
    .catch((error) => {
      // En caso de error, asignar un estado y texto personalizado al objeto del link
      link.status = 0;
      link.statusText = "Error: Link not valid";
      link.ok = "fail"; // Mensaje de fallo

      // Retornar el objeto del link con los datos actualizados
      throw link; // Lanzar el error para ser capturado en la promesa rechazada
    });
}

// Función para buscar archivos Markdown en un directorio y obtener los links
function searchMDFiles(input) {
  return new Promise((resolve, reject) => {
    if (typeof input !== "string") {
      reject("Path must be a string");
    }
    if (!path.isAbsolute(input)) {
      input = path.resolve(input);
    }

    // Verificar si el input es un archivo o un directorio
    fs.stat(input, (error, stats) => {
      if (error) {
        reject(`Error accessing path: ${error}`);
      } else {
        if (stats.isFile()) {
          // Si es un archivo, resolver con la ruta del archivo como un array
          resolve([input]);
        } else if (stats.isDirectory()) {
          // Si es un directorio, leer el contenido del directorio
          fs.readdir(input, (error, files) => {
            if (error) {
              reject(`Error reading directory: ${error}`);
            } else {
              const markdownFiles = []; // Array para almacenar las rutas completas de los archivos Markdown encontrados

              // Recorrer los archivos en el directorio
              files.forEach((file) => {
                const completeRoute = path.join(input, file); // Construir la ruta completa del archivo o subdirectorio

                // Verificar si es un archivo y tiene extensión ".md" (Markdown)
                if (fs.statSync(completeRoute).isFile() && path.extname(file) === ".md") {
                  markdownFiles.push(completeRoute); // Agregar la ruta completa del archivo Markdown al array 'markdownFiles'
                }
              });

              if (markdownFiles.length === 0) {
                reject("No MD links found");
              } else {
                console.log(colors.blue("These are the MD files and links!")); // Imprimir mensaje en consola
                resolve(markdownFiles);
              }
            }
          });
        } else {
          reject("Invalid path");
        }
      }
    });
  });
}

module.exports = {
  searchMDFiles, // Función para buscar archivos Markdown en un directorio y obtener los links
  readFileLinks, // Función para leer los links en un archivo Markdown
  validateLink, // Función para validar un link utilizando fetch
};
