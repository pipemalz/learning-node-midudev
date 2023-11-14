const path = require('node:path')

// Barra separadora de carpetas en las rutas del sistema operativo
console.log(path.sep)

// Nombre del archivo obtenido de una ruta
console.log(path.basename('./projects/todo-app/index.js'))

// Nombre del archivo obtenido de una ruta quitando la extensión especificada
console.log(path.basename('./projects/todo-app/index.js', '.js'))

// Obtener la extension de un archivo
console.log(path.extname('./projects/todo-app/index.js'))
