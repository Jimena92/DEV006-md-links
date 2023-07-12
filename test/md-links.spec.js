const mdLinks = require('../index');
const { searchMDFiles, validateLink, readFileLinks } = require('../functions');
const path = require('path');

describe('searchMDFiles', () => {
  it('Retorna un arreglo de rutas de archivos Markdown cuando se le proporciona un directorio', () => {
    const directoryPath = path.resolve('./Pruebas');

    return searchMDFiles(directoryPath)
      .then((result) => {
        expect(Array.isArray(result)).toBe(true); // Verificar si el resultado es un array
        expect(result.length).toBeGreaterThan(0); // Verificar si el array contiene elementos

        const absolutePaths = result.map((file) => path.resolve(file));

        expect(absolutePaths).toEqual(
          expect.arrayContaining([
            path.join(directoryPath, 'files.md'),
            path.join(directoryPath, 'lorem.md'),
          ])
        );
      });
  });

  it('Devuelve un array vacío cuando se proporciona un directorio inexistente', () => {
    const directory = './noexiste';
    return searchMDFiles(directory)
      .catch((error) => {
        // Verificar que se haya rechazado la promesa con el mensaje correcto
        expect(error).toEqual(expect.stringMatching('The file or directory does not exist'));
      });
  });

  it('Devuelve un array vacío cuando se proporciona un archivo inexistente', () => {
    const file = './noexiste.md';
    return searchMDFiles(file)
      .catch((error) => {
        // Verificar que se haya rechazado la promesa con el mensaje correcto
        expect(error).toEqual(expect.stringMatching('The file or directory does not exist'));
      });
  });

  it('Devuelve un array vacío cuando se proporciona una entrada inválida', () => {
    const invalidInput = 123; // Entrada inválida (no es una cadena)

    return searchMDFiles(invalidInput)
      .catch((error) => {
        // Verificar que se haya rechazado la promesa con el mensaje correcto
        expect(error).toBe('Path must be a string');
      });
  });
});

describe('validateLink', () => {
  it('Devuelve un objeto de enlace validado con estado y propiedades ok', () => {
    const link = {
      href: 'https://neoattack.com/proyectos/',
      text: 'Text not found',
      file: 'files.md',
    };

    return validateLink(link)
      .then((validatedLink) => {
        expect(validatedLink).toHaveProperty('status');
        expect(validatedLink).toHaveProperty('ok');
        expect(validatedLink.status).toBe(200);
        expect(validatedLink.ok).toBe('ok');
      });
  });
});

describe('readFileLinks', () => {
  it('Lee los links de un archivo Markdown correctamente', () => {
    // Mock de la función fs.readFile
    jest.mock('fs', () => ({
      readFile: (file, options, callback) => {
        const data = `Enlaces del archivo:
- [Enlace 1](https://www.error.com)
- [Enlace 2](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_)`;
        callback(null, data);
      },
    }));

    const fileRoute = './hola.md';

    return readFileLinks(fileRoute)
      .then((links) => {
        // Verificar que se hayan leído los links correctamente
        expect(Array.isArray(links)).toBe(true);
        expect(links.length).toBe(2);

        // Verificar los valores de los links individuales
        expect(links[0].href).toBe('https://www.error.com');
        expect(links[0].text).toBe(undefined);
        expect(links[1].href).toBe('https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_');
        expect(links[1].text).toBe(undefined);
      });
  });
});

describe('mdLinks', () => {
  it('Obtiene los links de un archivo Markdown sin validación', () => {
    return mdLinks('./hola.md')
      .then((links) => {
        expect(links).toEqual([
          {
            href: 'https://www.error.com',
            text: 'Text not found',
            file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\hola.md',
          },
          {
            href: 'https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_',
            text: 'Text not found',
            file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\hola.md',
          },
        ]);
      });
  });

  it('Obtiene los links de un archivo Markdown con validación', () => {
    return mdLinks('./hola.md', { validate: true })
      .then((result) => {
        expect(result).toEqual([
          {
            href: 'https://www.error.com',
            text: 'Text not found',
            file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\hola.md',
            status: 200,
            ok: 'ok',
          },
          {
            href: 'https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_',
            text: 'Text not found',
            file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\hola.md',
            status: 404,
            ok: 'ok',
          },
        ]);
      });
  });
});