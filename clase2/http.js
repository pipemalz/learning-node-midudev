const http = require('node:http')
const fs = require('node:fs/promises')

const processRequest = (request, response) => {
  response.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (request.url === '/') {
    response.statusCode = 200
    response.end('<h1> Bienvenido usuario </h1>')
  } else if (request.url === '/cursos') {
    response.statusCode = 200
    response.end('<p> Cursos disponibles </p>')
  } else if (request.url === '/imagen.png') {
    fs.readFile('./imagen.png')
      .then(data => {
        response.statusCode = 200
        response.setHeader('Content-Type', 'image/png')
        response.end(data)
      })
      .catch(err => {
        response.statusCode = 500
        response.end(`<h1> 500 Internal server error ${err} </h1>`)
      })
  } else {
    response.statusCode = 404
    response.end('<h2> 404 Not found </h2>')
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log('Listening on port 3000')
})
