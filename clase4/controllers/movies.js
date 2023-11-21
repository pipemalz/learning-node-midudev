import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/moviesSchema.js'

export class MovieController {
  static async getAll (request, response) {
    const { genre } = request.query

    const movies = await MovieModel.getAll({ genre })

    response.json(movies)
  }

  static async getById (request, response) {
    const { id } = request.params

    const movie = await MovieModel.getById({ id })

    if (movie) {
      return response.status(200).json(movie)
    }

    return response.status(404).send('Not Found')
  }

  static async create (request, response) {
    const result = validateMovie(request.body)

    if (result.error) {
      return response.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const input = result.data
    const created = await MovieModel.create({ input })

    response.status(201).json({ created })
  }

  static async delete (request, response) {
    const { id } = request.params

    const deleted = await MovieModel.delete({ id })

    if (deleted) return response.status(200).send({ deleted })

    return response.status(404).send('Movie not found')
  }

  static async update (request, response) {
    const result = validatePartialMovie(request.body)

    if (result.error) return response.status(400).json({ error: JSON.parse(result.error.message) })

    const { id } = request.params
    const input = result.data

    const updated = await MovieModel.update({ id, input })

    if (updated) return response.status(201).json({ updated })

    return response.status(404).send('Movie not found')
  }
}
