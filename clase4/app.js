import express from 'express'

import { moviesRouter } from './routes/movies.js'

const app = express() // Creación de la app con express.js
const PORT = 3000

app.disable('x-powered-by')

app.use(express.json()) // Middleware para manejar responses json https://www.npmjs.com/package/cors
app.use() // Middleware para cabeceras CORS, Por defecto asigna '*' a la cabecera Access-Control-Allow-Origin, por lo tanto si queremos limitarlo se mandamos un parametro con los origin permitidos

app.use('/movies', moviesRouter) // Todas las rutas de /movies lo redirige al router de movies que esta gestionando las request de forma separada.

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
