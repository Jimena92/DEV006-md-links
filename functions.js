const fs = require("fs"); // Módulo fs para operaciones de sistema de archivos
const path = require("path"); // Módulo path para trabajar con rutas de archivos
const colors = require("ansi-colors"); // Módulo colors para agregar colores a la consola

// Función para leer los links en un archivo Markdown
function readFileLinks(fileRoute) {
  return new Promise((resolve, reject) => {
    const links = []; // Array para almacenar los links encontrados
    fs.readFile(fileRoute, "utf8", (err, data) => {
      if (err) {
        // Si hay un error al leer el archivo, se rechaza la promesa con un mensaje de error
        reject(`Error reading file: ${err}`);
      } else {
        const urlRegex = /(https?:\/\/[^\s]+)/g; // Expresión regular para buscar URLs en el texto
        const matches = data.match(urlRegex); // Buscar todas las URLs en el texto
        if (matches) {
          matches.forEach((match) => {
            // Agregar cada URL encontrada a la lista de links
            links.push({ href: match, file: fileRoute });
          });
        }
        resolve(links); // Resolver la promesa con la lista de links
      }
    });
  });
}

// Función para validar un link utilizando fetch
function validateLink(link) {
  return fetch(link.href) // Realizar una petición HTTP GET al link
    .then((response) => {
      // Asignar el estado y el texto del estado al objeto del link
      link.status = response.status;
      link.ok = response.ok ? "ok" : "fail";
      return link; // Retornar el link actualizado con el estado y la propiedad "ok"
    })
    .catch((error) => {
      // Manejar el error de la promesa fetch
      console.error(error);
      link.status = -1; // Asignar un estado inválido (-1) para indicar un error
      link.ok = "fail";
      return link; // Retornar el link actualizado con el estado y la propiedad "ok"
    });
}

// Función para buscar archivos Markdown en un directorio y obtener los links
function searchMDFiles(input) {
  return new Promise((resolve, reject) => {
    if (typeof input !== "string") {
      // Si la entrada no es una cadena, se rechaza la promesa con un mensaje de error
      reject("Path must be a string");
      return;
    }

    fs.access(input, fs.constants.F_OK, (error) => {
      if (error) {
        if (error.code === 'ENOENT') {
          // Si el archivo o directorio no existe, se rechaza la promesa con un mensaje de error en color rojo
          reject(colors.red('The file or directory does not exist'));
        } else {
          reject(`Error accessing path: ${error}`); // Si hay un error al acceder a la ruta, se rechaza la promesa con un mensaje de error
        }
        return;
      }

      if (!path.isAbsolute(input)) {
        input = path.resolve(input); // Convertir la ruta relativa en una ruta absoluta
      }

      fs.stat(input, (error, stats) => {
        if (error) {
          reject(`Error accessing path: ${error}`); // Si hay un error al obtener las estadísticas del archivo/directorio, se rechaza la promesa con un mensaje de error
        } else {
          if (stats.isFile()) {
            resolve([input]); // Si es un archivo, se resuelve la promesa con un array que contiene la ruta del archivo
          } else if (stats.isDirectory()) {
            fs.readdir(input, (error, files) => {
              if (error) {
                reject(`Error reading directory: ${error}`); // Si hay un error al leer el directorio, se rechaza la promesa con un mensaje de error
              } else {
                const markdownFiles = [];
                files.forEach((file) => {
                  const completeRoute = path.join(input, file); // Obtener la ruta completa de cada archivo en el directorio
                  if (fs.statSync(completeRoute).isFile() && path.extname(file) === ".md") {
                    // Si el archivo es un archivo regular y tiene la extensión ".md", se agrega a la lista de archivos Markdown
                    markdownFiles.push(completeRoute);
                  }
                });

                if (markdownFiles.length === 0) {
                  // Si no se encontraron archivos Markdown en el directorio, se rechaza la promesa con un mensaje de error
                  reject("No MD links found");
                } else {
                  console.log(colors.blue("These are the MD files and links!")); // Imprimir un mensaje en color azul en la consola
                  resolve(markdownFiles); // Resolver la promesa con la lista de archivos Markdown encontrados
                }
              }
            });
          } else {
            reject("Invalid path"); // Si la ruta no es un archivo ni un directorio válido, se rechaza la promesa con un mensaje de error
          }
        }
      });
    });
  });
}

module.exports = {
  searchMDFiles, // Función para buscar archivos Markdown en un directorio y obtener los links
  readFileLinks, // Función para leer los links en un archivo Markdown
  validateLink, // Función para validar un link utilizando fetch
};