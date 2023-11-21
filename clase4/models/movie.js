import { readJSON } from '../utils.js'
import crypto from 'node:crypto'

// Forma optima de importar json en ESModules
const moviesJSON = readJSON('./movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return moviesJSON.filter(movie => {
        return movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
      })
    }
    return moviesJSON
  }

  static async getById ({ id }) {
    const movie = moviesJSON.find(movie => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    const id = crypto.randomUUID()
    const newMovie = {
      id,
      ...input
    }
    moviesJSON.push(newMovie)

    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = moviesJSON.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false

    return moviesJSON.splice(movieIndex, 1)
  }

  static async update ({ id, input }) {
    const movieIndex = moviesJSON.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false

    const updateMovie = {
      ...moviesJSON[movieIndex],
      ...input
    }

    moviesJSON[movieIndex] = updateMovie

    return updateMovie
  }
}
