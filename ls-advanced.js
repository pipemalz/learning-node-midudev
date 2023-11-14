const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

// Recuperar a través de los argumentos del proceso, la ruta al archivo que se está ejecutando en el proceso.
// const filePath = process.argv[1]

// Recuperar la ruta enviada por parametro, si no se pasa nada se asignara '.' en representacion del directorio actual.
const folder = process.argv[2] ?? '.'

async function ls (directory) {
  let files
  try {
    files = await fs.readdir(directory)
  } catch (error) {
    console.log(pc.red(`Error al leer el directorio: ${folder}\n`, error))
    process.exit(1)
  }
  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let fileStats
    try {
      fileStats = await fs.stat(filePath)
    } catch (error) {
      console.log(`Error leyendo el archivo: ${filePath}\n${error}`)
    }

    const isDirectory = fileStats.isDirectory() ? pc.green('true'.padEnd(5)) : pc.red('false')
    const dateModified = fileStats.mtime.toLocaleString()
    const size = fileStats.size

    return `Name: ${pc.white(file.padEnd(40, '.'))} Directory: ${isDirectory} Modified: ${pc.blue(dateModified.padStart(20))} Size: ${pc.yellow(size)}`
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach(info => console.log(pc.gray(info)))
}

ls(folder)
