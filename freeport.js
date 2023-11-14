const net = require('node:net') // Importo modulo que permite realizar comunicaciones en el protocolo TCP

function findAvailablePort (desiredPort) { // Pasamos como parámetro el puerto deseado
  return new Promise((resolve, reject) => { // Devolvemos la promesa con el puerto deseado, con el puerto disponible, o con el error
    const server = net.createServer() // Creamos el servidor

    server.listen(desiredPort, () => { // Escuchamos con el puerto deseado
      const { port } = server.address() // Extraemos el puerto
      server.close(() => { // Cerrramos el server para liberar el puerto
        resolve(port) // Resolvemos finalmente con el puerto deseado
      })
    })

    server.on('error', (err) => { // Si ocurrio un error o el puerto estaba ocupado lo manejamos con server.on
      if (err.code === 'EADDRINUSE') { // Evaluamos si el codigo de error es a causa de que el puerto se encuentra ocupado o en uso
        findAvailablePort(0).then(port => resolve(port)) // Ejecutamos la funcion de forma recursiva para intentar resolver la promesa con un puerto disponible mandandole el parametro 0
      // findAvailablePort(desiredPort + 1 ).then(port => resolve(port)) // Otra forma de hacerlo, estara buscando de forma recursiva el puerto sumandole 1 a cada iteración hasta encontrar uno que no esté en uso
      } else {
        reject(err) // Si el codigo de error no es porque esta en uso rechazamos la promesa con el error
      }
    })
  })
}

module.exports = { findAvailablePort }
