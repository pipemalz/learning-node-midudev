const http = require('node:http') // Importo modulo que permite realizar comunicaciones en el protocolo HTTP
const { findAvailablePort } = require('./freeport')

// const PORT = 0 // El puerto 0 busca automaticamente el primer puerto que esté disponible

const PORT = process.env.PORT ?? 3000 // Variable de entorno PORT. Ejemplo PORT=8000

const server = http.createServer((request, response) => {
  // Request: peticiones
  // Response: Respuesta a las peticiones

  console.log('Peticion recibida')
  // Voy a responder y terminar la comunicación con el mensaje 'Hola mundo'
  response.end('Hola mundo')
})

// Donde tiene que escuchar el servidor
// Especificamos el puerto
findAvailablePort(PORT).then(port => { // Le pasamos el puerto deseado, si está en uso, nos devolverá uno disponible. Ver freeport.js
  server.listen(port, () => {
    // Callback para hacer algo cuando el servidor empiece a escuchar
    console.log(`Server listening on port http://localhost:${server.address().port}`)
  })
})

console.log(process.env)
