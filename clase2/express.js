const express = require('express')
const app = express()

const dittoJSON = require('./pokemon/ditto.json')

// Desactivar headr X-PoweredBy: Express
app.disable('x-powered-by')

const PORT = 3000

// // El middleware se ejecuta despues de recibir la peticion y antes de la respuesta
// // Este middleware válida si la request es de tipo POST y si tiene el header Content-Type 'application/json', lo cual nos permitirá reutilizarla para este tipo de peticiones
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   let body = ''

//   // req.on me permite reaccionar a eventos, en este caso el evento 'data', que es cuando se reciben datos de la request, estos se reciben en trozos por lo cual hay que capturarlos en alguna variable de forma secuencial, con el fin de conservar la información integra y ordenada. A estos trozos se les denomina 'chunk'
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   // Al producirse el evento 'end' que es cuando la request termina de enviar data, parseamos la información para convertirla en objeto javascript  y posteriormente mutamos la propiedad body de la request para seguirla tratando más adelante por esto ponemos next() para que continue
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     req.body = data
//     next()
//   })
// })

// Todo el codigo anterior del middleware, gracias a express se puede resumir a la siguiente línea
app.use(express.json())

// Cuando la app recibe un get en el parametro 1 (ruta), entonces haz esta acción del parametro 2 (funcion)
app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON)
})

// Ya que habiamos mutado la request y su propiedad body de manera separada, ahora es tan simple como enviarla directamente ya que la request va viajando hasta ser tratada con la función app.post, al ser esta de tipo POST.
app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

// La última request a evaluar, se dispone para el error 404
// .use se ejecuta siempre sin importar si la request es GET, POST, HEAD, etc...
app.use((req, res) => {
  res.status(404).send('<h1>Not found</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
