const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] ?? '.' // Si process.argv[1] es null o undefined se asigna '.'

async function dir (directory) {
  let files
  try {
    files = await fs.readdir(directory)
  } catch (error) {
    console.log(`Error listando el directorio ${directory}:\n${error}`)
    process.exit(1)
  }

  const filesPromises = files.map(async file => {
    let fileStats
    const filePath = path.join(directory, file)

    try {
      fileStats = await fs.stat(filePath)
    } catch (error) {
      console.log(`Error recuperando el archivo ${filePath}:\n${error}`)
      process.exit(1)
    }

    const size = fileStats.size
    const isDirectory = fileStats.isDirectory()
    const dateModified = fileStats.mtime.toLocaleString()

    return `${dateModified.padEnd(23)} ${(isDirectory ? '<DIR>' : '').padStart(5)} ${(isDirectory ? '' : size.toString()).padStart(5)} ${file}`
  })

  const fileList = await Promise.all(filesPromises)

  console.log(`\nDirectorio de ${path.resolve(folder)}\n`)

  console.log(fileList.join('\n'))
}

dir(folder)
