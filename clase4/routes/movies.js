import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()

// Read all movies
moviesRouter.get('/', MovieController.getAll)

// Read movie by id
moviesRouter.get('/:id', MovieController.getById)

// Create movie
moviesRouter.post('/', MovieController.create)

// Delete movie
moviesRouter.delete('/:id', MovieController.delete)

// Update movie
moviesRouter.patch('/:id', MovieController.update)
