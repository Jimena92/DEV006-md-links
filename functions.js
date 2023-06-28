// Importa los módulos fs y path de Node.js
const fs = require("fs");
const path = require("path");

// Función asíncrona que busca archivos de tipo Markdown en un directorio y sus subdirectorios
async function buscarArchivosMarkdown(input) {
  // Crea una promesa que se resuelve si se encuentra un archivo de Markdown
  return new Promise(function (resolve, reject) {
    // Verifica si el input es una cadena de texto
    if (typeof input !== "string") {
      reject("The path must be a string");
    }
    // Verifica si el input es una ruta absoluta
    if (!path.isAbsolute(input)) {
      input = path.resolve(input);
    }
    // Verifica si el directorio existe
    if (!fs.existsSync(input)) {
      reject(`${input} no existe`);
    }
    // Inicializa un array vacío para almacenar las rutas de los archivos de Markdown encontrados
    let array = [];
    // Si el directorio es un directorio, busca archivos de Markdown en él y sus subdirectorios
    if (fs.statSync(input).isDirectory()) {
      // Lee los archivos en el directorio
      const files = fs.readdirSync(input);
      // Inicializa un array vacío para almacenar los resultados
      const results = [];

      // Itera sobre los archivos leídos
      files.forEach((file) => {
        // Construye la ruta completa del archivo en el directorio
        const fullPath = path.join(input, file);
        // Si el archivo es un directorio, busca archivos de Markdown en él y sus subdirectorios
        if (fs.statSync(fullPath).isDirectory()) {
          // Llama a la función buscarArchivosMarkdown en el subdirectorio
          const subdirectoryFiles = buscarArchivosMarkdown(fullPath);
          // Añade los archivos de Markdown encontrados en el subdirectorio a los resultados
          results.push(...subdirectoryFiles);
        }
        // Si el archivo es un archivo de Markdown, añade su ruta al array de resultados
        else if (path.extname(file) === ".md") {
          results.push(fullPath);
        }
      });
      // Si no se encuentran archivos MD, se rechazará
      if (results.length === 0) {
        reject("No markdown files found");
      }
      // Si se encuentran archivos MD, se resuelve con el array de resultados
      else {
        resolve(results);
      }
    }
  });
}

// Ejemplo de uso de la función
buscarArchivosMarkdown("./Pruebas")
  .then((files) => {
    // Imprime los archivos MD encontrados
    console.log(files);
  })
  .catch((error) => {
    // Si hay un error, imprime el mensaje de error
    console.error(error);
  });