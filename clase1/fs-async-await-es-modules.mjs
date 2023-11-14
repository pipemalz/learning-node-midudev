import fs from 'node:fs/promises'

const text = await fs.readFile('./archivo.txt', 'utf-8')

console.log('Do something while reading file')

console.log(text)
