// Javascript utiliza commonJS por defecto, lo cual implica que para utilizar los ES Modules el archivo debe tener la extensión .mjs

import contarLetras from "./characterCount.mjs";
import { getWordFromString } from "./getWordFromString.mjs";

const myString = "Hola, esto es un texto simple."

const lastWord = getWordFromString(myString)
console.log(lastWord);

const letraBuscada = "e"
const cantidadDeLetras = contarLetras(myString, letraBuscada)
console.log(` Existen ${cantidadDeLetras} letras "${letraBuscada}" en el texto "${myString}"`)