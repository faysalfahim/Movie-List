import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Login from './pages/login/login';
import ListComponent from './pages/movie-list/list';
import MovieDetails from './pages/movie-details/movie-details';
import FavouriteMovies from './pages/favourite-movies/list';

function App() {
  return (
    <Router>
     <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/list" element={<ListComponent/>}/>
          <Route exact path="/details/:id" element={<MovieDetails/>} />
          <Route exact path="/favourites" element={<FavouriteMovies/>} />
        </Routes>
    </Router>
  );
}

export default App;
