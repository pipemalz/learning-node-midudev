// Con callbacks
const { error } = require('node:console')
const fs = require('node:fs')

fs.stat('./archivo2.txt', (err, data) => {
  if (error) {
    console.log('Ha ocurrido un error leyendo el archivo: ', err)
    return
  }
  console.log(data)
})

// Con promises
const fsAsync = require('node:fs/promises')

fsAsync.stat('./archivo2.txt')
  .then(data => console.log(data))
  .catch(err => console.log('Ha ocurrido un error leyendo el archivo: ', err))
