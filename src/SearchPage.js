import React, { useState } from 'react';
import axios from 'axios';
import './SearchPage.css';
import BackToHomeButton from './BackToHomeButton';




function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=62d9e03ec374f8c75dcee152c64bcc50&language=en-US&query=${searchTerm}&page=1&include_adult=false`
    );
    setMovies(response.data.results.filter((movie) => movie.poster_path !== null));
  };

  const handleClear = () => {
    setSearchTerm('');
    setMovies([]);
  };

  const handleCheckbox = (event, movie) => {
    if (event.target.checked) {
      setSelectedMovie(movie);
    } else {
      setSelectedMovie(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const encodedName = encodeURIComponent(selectedMovie.title);

    axios.post("http://localhost:3000/testapi/testapi.php", { name: encodedName })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <BackToHomeButton />
      <h1 className="search-title">Search For a Movie & Save at the Bottom!</h1>
      <form onSubmit={handleSubmit}>
        <div className="search-container">
          <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
          {searchTerm && (
            <button type="button" onClick={handleClear}>
              Clear
            </button>
          )}
          <button type="submit">Search</button>
        </div>
      </form>
      <ul className="searched-movies">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-card">
            <label>
              <input
                type="checkbox"
                onChange={(event) => handleCheckbox(event, movie)}
                checked={selectedMovie?.id === movie.id}
              />
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-title">{movie.title}</div>
            </label>
          </li>
        ))}
      </ul>
      {selectedMovie && (
        <div className="save-movie-form">
          <h2>Save Your Movie:</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Name:
              <input type="text" value={selectedMovie.title} readOnly />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
  
}

export default SearchPage;
