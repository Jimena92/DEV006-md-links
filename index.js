const { searchMDFiles, readFileLinks, validateLink } = require("./functions");

// Función principal mdLinks que recibe la ruta y las opciones
function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    // Buscar archivos Markdown en la ruta especificada
    searchMDFiles(path)
      .then((files) => {
        // Para cada archivo, leer los links
        const linkPromises = files.map((file) => {
          return readFileLinks(file)
            .then((links) => {
              // Si se requiere validación, validar los links
              if (options.validate) {
                const linkValidationPromises = links.map((link) =>
                  validateLink(link)
                );
                return Promise.all(linkValidationPromises);
              }
              return links;
            })
            .catch((error) => {
              console.error(`Error reading links in file ${file}: ${error}`);
              return [];
            });
        });

        // Esperar a que todas las promesas de links se resuelvan
        Promise.all(linkPromises)
          .then((results) => {
            // Combinar todos los links en un solo arreglo
            const flattenedLinks = results.flat();
            resolve(flattenedLinks);
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });
}

const inputPath = process.argv[2]; // Obtener la ruta del archivo desde la línea de comandos

const options = {
  validate: false, // Cambiar a `true` o `false` según se requiera
};

// Llamar a la función mdLinks con la ruta y opciones
mdLinks(inputPath, options)
  .then((links) => {
    if (links.length === 0) {
      console.log("No links found.");
    } else {
      // Iterar sobre cada link y mostrar su información
      links.forEach((link) => {
        const linkInfo = {
          href: link.href,
          text: link.text || "No text found",
          file: link.file,
        };

        // Si se requiere validación, agregar información adicional
        if (options.validate) {
          linkInfo.status = link.status;
          linkInfo.ok = link.ok;
        }

        console.log(linkInfo);
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = { mdLinks };
