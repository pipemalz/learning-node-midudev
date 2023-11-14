// const fs = require('node:fs')

// fs.readdir('.', (err, files) => {
//   if (err) {
//     console.log(`Error leyendo el directorio:\n${err}`)
//     return;
//   }
//   files.forEach((file, index) => {
//     console.log(`${index + 1} - ${file}`)
//   })
// })

const fs = require('node:fs/promises')

fs.readdir('.')
  .then(files => {
    files.forEach((file, index) => {
      console.log(`${index + 1} - ${file}`)
    })
  })
  .catch(error => console.log(`Error leyendo el directorio:\n${error}`))
