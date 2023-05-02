import React, { useState, useEffect } from "react";
import BackToHomeButton from "./BackToHomeButton";

function DeleteSavedMovies() {
  const [movies, setMovies] = useState([]);
  const [moviePosters, setMoviePosters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/testapi/testapi.php")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);

        // Fetch movie poster images for each movie
        Promise.all(
          data.map((movie) => {
            return fetch(
              `https://api.themoviedb.org/3/search/movie?api_key=62d9e03ec374f8c75dcee152c64bcc50&query=${movie.name}`
            )
              .then((response) => response.json())
              .then((data) => {
                const posterPath =
                  data.results && data.results[0] && data.results[0].poster_path;
                return {
                  id: movie.id,
                  posterUrl: `https://image.tmdb.org/t/p/w500${posterPath}`,
                };
              });
          })
        ).then((moviePosterUrls) => setMoviePosters(moviePosterUrls));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteMovie = (name) => {
    fetch("http://localhost:3000/testapi/testapi.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(movies.filter((movie) => movie.name !== name));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <BackToHomeButton />
      <h1 className="saved-movies-title">Saved Movies</h1>

      {movies.length > 0 ? (
        <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap" }}>
          {movies.map((movie, index) => (
            <li
              key={movie.id}
              style={{
                width: "30%",
                margin: "0 1.5% 20px",
                textAlign: "center",
              }}
            >
              {moviePosters.length > 0 &&
                moviePosters[index] &&
                moviePosters[index].posterUrl && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={moviePosters[index].posterUrl}
                      alt={movie.title}
                      style={{ width: "200px" }}
                    />
                    <strong>{movie.name}</strong>
                    <button
                      style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteMovie(movie.name)}
                    >
                      Delete
                    </button>
                  </div>
                )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies saved yet!</p>
      )}
    </div>
  );
}








export default SavedMovies;
