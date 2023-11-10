const fs = require('node:fs')
const wordCount = require('./commonJS_cjs/characterCount')

const text = fs.readFileSync('./archivo.txt', 'utf-8')
console.log(wordCount(text, "o"))

console.log("Do something while reading file")

const text2 = fs.readFileSync('./archivo2.txt', 'utf-8')
console.log(text2)

console.log("Do something else while reading file")

const text3 = fs.readFileSync('./archivo3.txt', 'utf-8')
console.log(text3)

