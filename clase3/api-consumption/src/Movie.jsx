import { useState } from "react"

function Movie ({ id, title, year, director, poster}) {

const [infoVisibility, setInfoVisibility] = useState(false)

function toggleMovieInfoVisibility (e) {
  if(e.type === 'mouseover') setInfoVisibility(true)
  if(e.type === 'mouseleave') setInfoVisibility(false)
}

return (
  <article
    data-id={id}
    style={
      {
        backgroundImage: `url(${poster})`
      }
    }
    onMouseOver={toggleMovieInfoVisibility}
    onMouseLeave={toggleMovieInfoVisibility}
  >
    <div className='movie-info'>
      {infoVisibility && (
        <>
          <h2>{title}</h2>
          <p>{year}</p>
          <p>{director}</p>
        </>
      )}
    </div>
  </article>
)
}

export { Movie }