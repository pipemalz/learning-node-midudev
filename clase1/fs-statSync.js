const fs = require('node:fs')

const fileInfo = fs.statSync('./archivo.txt')

console.log(
  fileInfo.size,
  fileInfo.isDirectory(),
  fileInfo.isSymbolicLink()
)
