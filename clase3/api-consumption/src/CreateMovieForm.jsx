import { useState } from "react"

function CreateMovieForm ({ updateMovies }) {
    const [formInfo, setFormInfo] = useState({
        title: '',
        year: '',
        director: '',
        duration: '',
        rate: '',
        poster: '',
        genre: ''
    })

    function updateFormInfo(object){
        const currentFormInfo = {...formInfo}
        const newFormInfo = {...object}

        setFormInfo({...currentFormInfo, ...newFormInfo})
    }

    function inputHandler(e){
        const { id, value } = e.target
        
        const newInfo = {}
        newInfo[id] = value

        updateFormInfo(newInfo)
    }

    function createMovie (e) {
        e.preventDefault()
        const infoValidated = {...formInfo}

        infoValidated.year = Number(infoValidated.year)
        infoValidated.duration = Number(infoValidated.duration)
        infoValidated.rate = Number(infoValidated.rate)
        infoValidated.genre = [infoValidated.genre]

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoValidated)
        }   

        setFormInfo(infoValidated)

        fetch('http://localhost:3000/movies', options)
            .then(res => {
                if (res.ok){
                    alert('Creado Satisfactoriamente')
                    updateMovies()
                }
            })
    }
    
    return (
        <form>
            <label htmlFor="title">
                <p>Title</p>
                <input onChange={inputHandler} type="text" id="title" placeholder="Movie title" value={formInfo.title}/>
            </label>

            <label htmlFor="year">
                <p>Year</p>
                <input onChange={inputHandler} type="text" id="year" placeholder="Movie year" value={formInfo.year}/>
            </label>

            <label htmlFor="director">
                <p>Director</p>
                <input onChange={inputHandler} type="text" id="director" placeholder="Movie director" value={formInfo.director}/>
            </label>

            <label htmlFor="duration">
                <p>Duration</p>
                <input onChange={inputHandler} type="text" id="duration" placeholder="Movie duration" value={formInfo.duration}/>
            </label>

            <label htmlFor="rate">
                <p>Rate</p>
                <input onChange={inputHandler} type="text" id="rate" placeholder="Movie rate" value={formInfo.rate}/>
            </label>

            <label htmlFor="poster">
                <p>Poster</p>
                <input onChange={inputHandler} type="text" id="poster" placeholder="Movie poster url" value={formInfo.poster}/>
            </label>

            <label htmlFor="genre">
                <p>Genre</p>
                <select onChange={inputHandler} name="genre" id="genre" value={formInfo.genre}>
                    <option value='Action'>Action</option>
                    <option value='Romance'>Romance</option>
                    <option value='Comedy'>Comedy</option>
                    <option value='Crime'>Crime</option>
                </select>
            </label>

            <button
                style={{display: 'block'}}
                onClick={createMovie}
            >Submit</button>
        </form>
    )
}

export { CreateMovieForm }