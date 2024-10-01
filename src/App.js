import './App.css';
import { getMovieList, searchMovie } from "./api"
import { useEffect, useState } from "react"

const App = () => {

const imgUrl = process.env.REACT_APP_BASEIMGURL

const [popularMovies, setPopularMovies] = useState([])



  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{movie.title}</div>
          <img src={`${imgUrl}${movie.poster_path}`} alt="" className="movie-image" />
          <div className="movie-date">{movie.release_date}</div>
          <div className="movie-rating">&#9733; {movie.vote_average}</div>
        </div>
      )
    })
  }

  const search = async(q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>BINFLIX</h1>
        <input 
          type="text" 
          placeholder="Search for movies.." 
          className="movie-search" 
          onChange={({target}) => search(target.value)}
        />
        <div className="movie-container">
          <PopularMovieList />
        </div>

      </header>
    </div>
  );
}

export default App;