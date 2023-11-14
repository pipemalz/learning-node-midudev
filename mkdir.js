const fs = require('node:fs/promises')
const path = require('node:path')

const newFolder = process.argv[2]

async function mkdir (folderPath) {
  const foldersArray = folderPath.split('/')
  const foldersToCreate = foldersArray.map((folder, index) => {
    const newFoldersArray = foldersArray.slice(0, index + 1)
    const newFolderPath = path.resolve(...newFoldersArray)
    return newFolderPath
  })

  const createdFoldersPromises = foldersToCreate.map(async (folder, index) => {
    try { // Verificar si existe el directorio
      await fs.access(folder, fs.constants.F_OK)
      if (index === foldersToCreate.length - 1) {
        return `Directorio ya existe: ${folder}`
      } else return ''
    } catch (error) { // Si no existe proceder a crearlo
      let createDir
      try {
        createDir = await fs.mkdir(folder, { recursive: true })
      } catch (error) {
        console.log(`Error creando el directorio ${folder}:\n${error}`)
        process.exit(1)
      }

      return `Directorio creado ${createDir}`
    }
  })

  const folderCreatedInfo = await Promise.all(createdFoldersPromises)
  console.log(folderCreatedInfo.filter(folder => folder !== '').join('\n'))
}

mkdir(newFolder)
