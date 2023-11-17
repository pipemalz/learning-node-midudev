const express = require('express')
const crypto = require('node:crypto')
const z = require('zod') // zod es una dependencia que nos permite crear validaciones para los datos que se recibe y procesa la API

const app = express()
const PORT = 3000
const moviesJSON = require('./movies.json')

app.disable('x-powered-by')

app.use(express.json())

app.get('/', (request, response) => {
  response.status(200).json({ message: 'hola mundo' })
})

// Todos los recursos para MOVIES se identifican con /movies a estas rutas se le denomina endpoint.
app.get('/movies', (request, response) => {
  // recuperamos el el genero enviado por query strings
  const { genre } = request.query
  const result = []

  if (genre) {
    const filteredByGenre = moviesJSON.filter(movie => {
      return movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
    })

    if (filteredByGenre.length > 0) {
      result.push(filteredByGenre)
      return response.status(200).json(result)
    }
    return response.status(404).send('Not Found')
  }

  response.status(200).json(moviesJSON)
})

app.get('/movies/:id', (request, response) => { // path-to-regexp
  const { id } = request.params
  const movie = moviesJSON.find(movie => movie.id === id)
  if (movie) {
    response.status(200).json(movie)
  } else {
    response.status(404).send('Not Found')
  }
})

app.post('/movies', (request, response) => {
  const { title, year, director, duration, genre } = request.body
  const id = crypto.randomUUID()

  // Creamos el esquema, el cual representará los tipos de datos y las caracteristicas que deben cumplir para ser validados a través de los métodos que nos ofrece la dependencia zod
  const moviesSchema = z.object({
    title: z.string({ // El titulo debe ser string
      invalid_type_error: 'Movie title must be a string', // Si no es un string, podemos utilizar el atributo invalid_type_error para mandarle un error personalizado
      required_error: 'Movie title is required' // Si no se envia el titulo
    }),
    year: z.number().int().min(1900).max(2024) // El año debe ser un número entero entre 1900 y 2024, zod nos permite encadenar las validaciones de esta forma
  })

  const newMovie = {
    id,
    title,
    year,
    director,
    duration,
    genre
  }

  moviesJSON.push(newMovie)

  response.status(201).json(moviesJSON)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
