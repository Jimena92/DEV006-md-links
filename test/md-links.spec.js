// const mdLinks = require('../');


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });

const { mdLinks } = require('../index');
const { searchMDFiles, readFileLinks } = require('../functions');

describe('mdLinks', () => {
  it('should return an array of links when called with a valid path', () => {
    const path = './Pruebas';
    return expect(mdLinks(path)).resolves.toEqual([
      {
        href: 'https://lineadecodigo.com/javascript/extraer-partes-una-url-javascript/',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\files.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://parzibyte.me/blog/2018/12/27/leer-archivo-node-js-fs-readline/',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\files.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/concat',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\files.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://www.geeksforgeeks.org/javascript-match-function/',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\files.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/then',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\files.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://seoquito.com/como-encontrar-enlaces-rotos/ko',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\files.md',
        status: 404,
        statusText: 'Not Found'
      },
      {
        href: 'https://neoattack.com/proyectos/',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\files.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://www.error.com',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\hola.md',
        status: 200,
        statusText: 'OK'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_',
        file: 'C:\\Users\\Jimena\\Desktop\\MD-LINKS\\DEV006-md-links\\Pruebas\\hola.md',
        status: 404,
        statusText: 'Not Found'
      }
    ]);
  });
});
