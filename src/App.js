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
          <div className="movie-rating">{movie.vote_average}</div>
        </div>
      )
    })
  }

  const search = (q) => {
    console.log({q})
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