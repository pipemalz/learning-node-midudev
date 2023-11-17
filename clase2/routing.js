const http = require('node:http')
const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET': {
      switch (url) {
        case '/pokemon/ditto':
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(dittoJSON))
          break
        default:
          res.statusCode = 404
          res.end('404 Not Found')
      }
      break
    }
    case 'POST': {
      switch (url) {
        case '/pokemon': {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
            res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statusCode = 404
          res.end('404 Not Found')
          break
      }
      break
    }
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log('Listening on port 3000')
})
