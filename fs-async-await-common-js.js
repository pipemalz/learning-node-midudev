// Forma anterior de hacerlo, si se esta trabajando con una version sin node:fs/promises o cualquier otro modulo nativo que no tenga promesas
// const fs = require('node:fs')
// const { promisify } = require('node:util')
// const readFilePrimise = promisify(fs.readFile)

// readFilePrimise('./archivo2.txt', 'utf-8')
//   .then(data => console.log(data))

//Forma de hacerlo en nuevas versiones
const fs = require('node:fs/promises')

fs.readFile('./archivo2.txt', 'utf-8')
  .then(data => console.log(data))

console.log("Do something while reading file")

  // IIFE --> Immediately Invoked Function Expresion 
;(async () => {
  const text = await fs.readFile('./archivo.txt', 'utf-8')

  const wordCount = require('./commonJS_cjs/characterCount')

  const lettersCount = await wordCount(text, "o")

  console.log(lettersCount)
})()

console.log("Do something else while reading file")

fs.readFile('./archivo3.txt', 'utf-8')
  .then(data => console.log(data))