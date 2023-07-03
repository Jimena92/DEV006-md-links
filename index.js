// Importa la función SearchMdFiles desde el archivo index.js
const searchMDFiles = require("./functions.js");

// Definición de la función mdLinks
function mdLinks(path) {
  return new Promise((resolve, reject) => {
    // Llama a la función SearchMdFiles con la ruta especificada
    SearchMdFiles(path)
      .then((result) => {
        // Resuelve la promesa con el resultado obtenido de SearchMdFiles
        resolve(result);
      })
      .catch((error) => {
        // Rechaza la promesa con el error capturado
        reject(error);
      });
  });
}

// Exporta la función mdLinks para que pueda ser utilizada por otros módulos
module.exports = mdLinks;