const process = require('node:process')

//Process nos permite obtener información y controlar el proceso de ejecución

// Argumentos de entrada. Para verlo mejor ejecutar desde linea de comandos. Ejemplo "node process.js argumento1 argumento2"
console.log(process.argv)

// Controlar eventos del proceso
// Se ejecutará al producirse el evento process.exit()
process.on('exit', () => {
  //limpiar recursos
  console.log('Limpiando recursos')
}) 

// Recuperar el directorio actual (Current working directory) donde está inicializado el proceso.
console.log(process.cwd())

// Recuperar variables de entorno
console.log(process.env.NOMBRE_VARIABLE)

// 0 --> El proceso ha ido bien y termina aquí. 
process.exit(0)

// // 1 --> El proceso ha tenido algún error y queremos que salga para evitar crasheos u otros problemas.
// process.exit(1)

// // Sí no ponemos nada el 0 es por defecto.
// process.exit()

