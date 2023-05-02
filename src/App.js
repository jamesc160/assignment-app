import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PopularMovies from './PopularMovies';
import SearchPage from './SearchPage';
import SavedMovies from './SavedMovies';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/popular-movies" component={PopularMovies} />
        <Route path="/search-movies" component={SearchPage} />
        <Route path="/saved-movies" component={SavedMovies} />
      </Switch>
    </Router>
  );
}

export default App;


