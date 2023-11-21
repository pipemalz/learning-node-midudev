import { Router } from 'express'
import { readJSON } from '../utils'
import { validateMovie, validatePartialMovie } from '../schemas/moviesSchema'
import crypto from 'node:crypto'

export const moviesRouter = Router()
// Forma optima de importar json en ESModules
const moviesJSON = readJSON('./movies.json')

moviesRouter.get('/', (request, response) => {
  const { genre } = request.query

  if (genre) {
    const filteredByGenre = moviesJSON.filter(movie => {
      return movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
    })

    if (filteredByGenre.length > 0) {
      return response.status(200).json(filteredByGenre)
    }
    return response.status(404).send('Not Found')
  }

  response.status(200).json(moviesJSON)
})

moviesRouter.get('/:id', (request, response) => {
  const { id } = request.params
  const movie = moviesJSON.find(movie => movie.id === id)
  if (movie) {
    response.status(200).json(movie)
  } else {
    response.status(404).send('Not Found')
  }
})

moviesRouter.post('/', (request, response) => {
  const result = validateMovie(request.body)

  if (result.error) {
    return response.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const id = crypto.randomUUID()

  const newMovie = {
    id,
    ...result.data
  }
  moviesJSON.push(newMovie)

  response.status(201).json(moviesJSON)
})

moviesRouter.patch('/:id', (request, response) => {
  const result = validatePartialMovie(request.body)

  if (result.error) return response.status(400).json({ error: JSON.parse(result.error.message) })

  const { id } = request.params
  const movieIndex = moviesJSON.findIndex(movie => movie.id === id)

  if (movieIndex < 0) return response.status(404).send('Movie not found')

  const updateMovie = {
    ...moviesJSON[movieIndex],
    ...result.data
  }

  moviesJSON[movieIndex] = updateMovie

  response.status(201).json(updateMovie)
})

moviesRouter.delete('/:id', (request, response) => {
  const { id } = request.params
  const movieIndex = moviesJSON.findIndex(movie => movie.id === id)

  if (movieIndex < 0) return response.status(404).send('Movie not found')

  const [deleted] = moviesJSON.splice(movieIndex, 1)

  return response.status(200).send({ deleted })
})
