const { readFile } = require('node:fs/promises')

const file = process.argv[2]

async function cat(filePath) {
  let text
  try {
    text = await readFile(filePath, 'utf-8')
  } catch (error) {
    console.log(`Error al abir el archivo ${filePath}:\n${error}`)
    process.exit(1)
  }

  console.log(text)
}

cat(file)