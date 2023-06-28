// Importa la función buscarArchivosMarkdown desde el archivo index.js
const buscarArchivosMarkdown = require("./index.js");

// Definición de la función mdLinks
function mdLinks(path) {
  return new Promise((resolve, reject) => {
    // Llama a la función buscarArchivosMarkdown con la ruta especificada
    buscarArchivosMarkdown(path)
      .then((result) => {
        // Resuelve la promesa con el resultado obtenido de buscarArchivosMarkdown
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