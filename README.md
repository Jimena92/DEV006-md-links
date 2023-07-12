# MD-Links
MD-Links es una biblioteca de JavaScript que te permite analizar archivos Markdown y extraer los enlaces que contienen. Puedes utilizar esta herramienta importándola en tu proyecto y llamando a la función principal para obtener información sobre los enlaces presentes en tus archivos Markdown, como la URL, el texto de anclaje y el archivo en el que se encuentra cada enlace.

## Instalación
Para utilizar MD-Links en tu proyecto, sigue estos pasos:

Descarga el código fuente del repositorio y colócalo en la ubicación deseada de tu proyecto. Asegúrate de tener instalado Node.js en tu computadora.

## Uso
Una vez que hayas importado la biblioteca MD-Links en tu proyecto, puedes utilizarla llamando a la función principal mdLinks y pasándole la ruta del archivo o directorio que deseas analizar.

El módulo debe poder **importarse** en otros scripts de Node.js y ofrece la siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
Si la ruta pasada es relativa, debe resolverse como relativa al directorio
desde donde se invoca node - _current working directory_).
* `options`: Un objeto con **únicamente** la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función debe **retornar una promesa** (`Promise`) que **resuelva a un arreglo**
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);
```

## Diagrama de Flujo

Aquí tienes el diagrama de flujo que representa el flujo de trabajo de la biblioteca MD-Links:


[Diagrama de flujo](https://www.figma.com/file/hBVv2hkSjGWjkFCqHcfVvI/DIAGRAMA-MD-LINKS?type=design&node-id=2-9&mode=design&t=LHKZCYPtvI7uenKu-0)

## Contribuciones

¡Todas las contribuciones son bienvenidas! Si tienes alguna sugerencia, mejora o corrección, no dudes en abrir un issue o enviar una solicitud de pull. Trabajemos juntos para mejorar esta biblioteca y hacerla más útil para la comunidad.

## Agradecimientos

AGradezco a todos aquellos que han contribuido y apoyado este proyecto.

¡Gracias por utilizar MD-Links! Espero que esta biblioteca sea útil en tu proyecto. Si tienes alguna pregunta o inquietud, no dudes en contactarme. Estoy abierta a recomendaciones.