import React, { useState, useEffect } from "react";
import "./PopularMovies.css";
import BackToHomeButton from './BackToHomeButton';

function MyForm() {
  const [name, setName] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=62d9e03ec374f8c75dcee152c64bcc50`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (movie) => (event) => {
    event.preventDefault();

    const encodedName = encodeURIComponent(movie.title);

    fetch("http://localhost:3000/testapi/testapi.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: encodedName }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCheckbox = (event, movie) => {
    if (event.target.checked) {
      setSelectedMovies([...selectedMovies, movie]);
    } else {
      setSelectedMovies(selectedMovies.filter((m) => m.id !== movie.id));
    }
  };

  return (
    <div>
      <BackToHomeButton />
       <h1 className="popular-movies-title">Popular Movies</h1>
       <h2 className="select-a-movie">Select a Movie to Save it at the bottom of the page!</h2>
      <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <li
            key={movie.id}
            style={{ width: "30%", margin: "0 1.5% 20px", textAlign: "center" }}
          >
            <label>
              <input
                type="checkbox"
                onChange={(event) => handleCheckbox(event, movie)}
              />
              <strong>{movie.title}</strong>
              <br />
              <img
                src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                alt={movie.title}
              />
            </label>
          </li>
        ))}
      </ul>

      {selectedMovies.length > 0 && (
        <div className="save-movies">
          <h2>Save Your Movies!:</h2>
          {selectedMovies.map((movie) => (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <form onSubmit={handleSubmit(movie)}>
                <label>
                  Name:
                  <input
                    type="text"
                    value={movie.title}
                    readOnly
                  />
                </label>
                <button type="submit">Submit</button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyForm;
