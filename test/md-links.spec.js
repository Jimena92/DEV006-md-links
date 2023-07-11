// const mdLinks = require('../');


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });

const { mdLinks } = require('../index');

describe('mdLinks', () => {
  it('should return an array of links when called with a valid path', () => {
    const path = './Pruebas';
    const expectedLinks = [
      {
        href: 'https://lineadecodigo.com/javascript/extraer-partes-una-url-javascript/',
        text: 'No se encontró texto',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\files.md',
        status: 200,
        ok: 'OK'
      },
      {
        href: 'https://parzibyte.me/blog/2018/12/27/leer-archivo-node-js-fs-readline/',
        text: 'No se encontró texto',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\files.md',
        status: 200,
        ok: 'OK'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/concat',
        text: 'No se encontró texto',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\files.md',
        status: 200,
        ok: 'OK'
      },
      {
        href: 'https://www.geeksforgeeks.org/javascript-match-function/',
        text: 'No se encontró texto',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\files.md',
        status: 200,
        ok: 'OK'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/then',
        text: 'No se encontró texto',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\files.md',
        status: 200,
        ok: 'OK'
      },
      {
        href: 'https://seoquito.com/como-encontrar-enlaces-rotos/ko',
        text: 'No se encontró texto',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\files.md',
        status: 404,
        ok: 'Not Found'
      },
      {
        href: 'https://neoattack.com/proyectos/',
        text: 'No se encontró texto',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\files.md',
        status: 200,
        ok: 'OK'
      },
      {
        href: 'https://www.error.com',
        text: 'No se encontró texto',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\hola.md',
        status: 200,
        ok: 'OK'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_',
        text: 'No se encontró texto',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\hola.md',
        status: 404,
        ok: 'Not Found'
      }
    ];

    return mdLinks(path).then((links) => {
      expect(links).toEqual(expectedLinks);
    });
  });
});
