// import fs from 'node:fs/promises'

// const text = await fs.readFile('./archivo.txt', 'utf-8')
// const text2 = await fs.readFile('./archivo2.txt', 'utf-8')
// const text3 = await fs.readFile('./archivo3.txt', 'utf-8')

// Promise.all([text, text2, text3]).then(responses => console.log(responses))

import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8'),
  readFile('./archivo3.txt', 'utf-8')
]).then(([res1, res2, res3]) => {
  console.log(`Texto1: ${res1}\nTexto2: ${res2}\nTexto3: ${res3}`)
})
  .catch(error => console.log(error))

console.log('Do something while reading files')
