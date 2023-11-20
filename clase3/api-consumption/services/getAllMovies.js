export const getAllMovies = async url => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        const movies = await data
        
        return movies
    } catch (error) {
        return new Error('Error fetching movies')
    }
}