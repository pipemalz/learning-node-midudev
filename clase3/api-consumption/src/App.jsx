import { useEffect, useState } from "react"
import './App.css'
import { Movie } from "./Movie"
import { getAllMovies } from "../services/getAllMovies"
import { CreateMovieForm } from "./CreateMovieForm"

function App () {
  const [movies, setMovies] = useState([])

  function updateMovies () {
    getAllMovies('http://localhost:3000/movies').then(movies => setMovies(movies))
  }

  useEffect(updateMovies, [])

  return (
    <main>
      <section className="movies-section">
        {
          movies.map(movie => {
            const { id, title, year, director, poster } = movie
            return (
              <Movie key={id} id={id} title={title} year={year} director={director} poster={poster} />
            )
          })
        }
      </section>
      <section className="create-movie-section">
        <CreateMovieForm updateMovies={updateMovies}/>
      </section>
    </main>
  )
}

export default App