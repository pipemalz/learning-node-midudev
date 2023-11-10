//Para trabajar con modulos de commonJS al ser por defecto en javascript podemos usarlo con la extensión del archivo .js o si se requiere forzar se usa .cjs

const { getWordFromString } = require('./getWordFromString') //Al exportarse la funcion dentro de objeto se debe respetar el nombre de la funcion importada.
const contarLetras = require('./characterCount') //Al exportarse simplemente la funcion la puedo importar con el nombre que desee.

const myString = "Hola, esto es un texto simple."

const lastWord = getWordFromString(myString)
console.log(lastWord);

const letraBuscada = "o"
const cantidadDeLetras = contarLetras(myString, letraBuscada)
console.log(` Existen ${cantidadDeLetras} letras "${letraBuscada}" en el texto "${myString}"`)