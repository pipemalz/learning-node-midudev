// Forma de trabajar sincrono y con callbacks

const fs = require('node:fs')

fs.readFile('./archivo2.txt', 'utf-8', (err, data) => {
  console.log(data)
})

console.log('Do something while reading file')

fs.readFile('./archivo3.txt', 'utf-8', (err, data) => {
  console.log(data)
})

console.log('Do something else while reading file')
