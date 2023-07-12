const mdLinks = require("./index");

// Ejemplo 1: Obtener los links de un directorio sin validación
// mdLinks("./hola.md")
//   .then((links) => {
//     console.log(links);
//   })
//   .catch(console.error);

// Ejemplo 2: Obtener los links de un directorio con validación
mdLinks("./README.md", { validate: true })
  .then((links) => {
    console.log(links);
  })
  .catch(console.error);

