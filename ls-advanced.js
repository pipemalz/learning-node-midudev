const fs = require('node:fs/promises')
const path = require('node:path')

// Recuperar a través de los argumentos del proceso, la ruta al archivo que se está ejecutando en el proceso.
const filePath = process.argv[1] 

// Recuperar la ruta enviada por parametro, si no se pasa nada se asignara '.' en representacion del directorio actual.
const folder = process.argv[2] ?? '.'

async function ls(directory) {
  let files
  try {
    files = await fs.readdir(directory)
  } catch(error) {
    console.log(`Error al leer el directorio: ${folder}\n`, error)
    process.exit(1)
  }
  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let fileStats
    try {
      fileStats = await fs.stat(filePath)
    } catch(error) {
      console.log(`Error leyendo el archivo: ${filePath}\n${error}`)
    }

    const isDirectory = fileStats.isDirectory()
    const dateModified = fileStats.mtime.toLocaleString()
    const size = fileStats.size

    return `Name: ${file.padEnd(40, '.')} Directory: ${isDirectory.toString().padEnd(5)} Modified: ${dateModified} Size: ${size}`
  })

  const filesInfo = await Promise.all(filesPromises)

  console.log(filesInfo)
}

ls(folder)