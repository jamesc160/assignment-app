import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import axios from 'axios';
//import SearchPage from './SearchPage';

function HomePage() {
  const [backgroundUrl, setBackgroundUrl] = useState('');

  useEffect(() => {
    async function fetchBackgroundUrl() {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=62d9e03ec374f8c75dcee152c64bcc50&language=en-US&page=1'
      );
      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      const imageUrl = `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;
      setBackgroundUrl(imageUrl);
    }
    fetchBackgroundUrl();
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    minWidth: '100vw'
  };

  return (
    <div className="homepage" style={backgroundStyle}>
      <div className="content">
        <h1>Welcome To My Movie app</h1>
        <Link to="/popular-movies">Popular Movies</Link>
        <Link to="/search-movies">Search for a movie?</Link>
        <Link to="/saved-movies">My Saved Movies</Link>
      </div>
    </div>
  );
}

export default HomePage;
