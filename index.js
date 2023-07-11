const { searchMDFiles, readFileLinks, validateLink } = require("./functions");

// Función mdLinks que recibe una ruta y opciones como parámetros
function mdLinks(path, options = { validate: false }) {
  return new Promise((resolve, reject) => {
    // Llamada a la función searchMDFiles para buscar archivos Markdown en la ruta especificada
    searchMDFiles(path)
      .then((files) => {
        // Para cada archivo encontrado, se crea un array de promesas de links
        const linkPromises = files.map((file) => {
          return readFileLinks(file)
            .then((links) => {
              // Si las opciones incluyen validar los links
              if (options.validate) {
                // Se crea un array de promesas de validación de links
                const linkValidationPromises = links.map((link) => {
                  return validateLink(link).then((result) => ({
                    ...link,
                    status: result.status,
                    ok: result.ok ? "ok" : "fail",
                  }));
                });
                // Se resuelve todas las promesas de validación de links
                return Promise.all(linkValidationPromises);
              }
              // Si no se requiere validación, se resuelven los links sin cambios
              return links;
            })
            .catch((error) => {
              console.error(`Error reading links in file ${file}:`, error);
              return [];
            });
        });

        // Se resuelven todas las promesas de links
        Promise.all(linkPromises)
          .then((results) => {
            // Se aplana el array de resultados y se realiza la transformación de acuerdo a las opciones
            const flattenedLinks = results.flat().map((link) => {
              if (options.validate) {
                return {
                  href: link.href,
                  text: link.text || "Text not found",
                  file: link.file,
                  status: link.status,
                  ok: link.ok,
                };
              } else {
                return {
                  href: link.href,
                  text: link.text || "Text not found",
                  file: link.file,
                };
              }
            });
            // Se resuelve con los links resultantes
            resolve(flattenedLinks);
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });
}

module.exports = mdLinks;
