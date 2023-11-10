// Con callbacks
const fs = require('node:fs')

fs.stat('./archivo2.txt', (err, data) => {
  console.log(data)
})

// Con promises
const fsAsync = require('node:fs/promises')

fsAsync.stat('./archivo2.txt')
  .then(data => console.log(data))