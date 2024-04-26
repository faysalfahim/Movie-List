import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";
import MovieList from "../../statics/movielist";
import SearchBar from "../../components/search-bar";
import MovieListGrid from "../../components/list";

const movieData = MovieList;

function FavouriteMovies() {
  const navigate = useNavigate();
  const favourites = JSON.parse(localStorage.getItem("favorites")) || {};
  const [searchTerm, setSearchTerm] = useState("");
  const [starredMovies, setStarredMovies] = useState(favourites);

  const handleCardClick = (movieId) => {
    navigate(`/details/${movieId}`);
  };

  const toggleFavourite = (movieId) => {
    setStarredMovies((prevStarredMovies) => {
      const updatedFavourites = { ...prevStarredMovies };
      if (updatedFavourites[movieId]) {
        delete updatedFavourites[movieId];
      } else {
        updatedFavourites[movieId] = true;
      }
      return updatedFavourites;
    });
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(starredMovies));
  }, [starredMovies]);

  const isStarred = (movieId) => {
    return starredMovies[movieId];
  };

  const filteredMovies = movieData.filter((movie) => {
    const isMatchSearchTerm =
      movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.cast.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.category.toLowerCase().includes(searchTerm.toLowerCase());

    return favourites[movie.id] && isMatchSearchTerm;
  });

  const goBackToList = () => {
    navigate("/list");
  };

  const handleSearch = () => {
    // Implement your search functionality here if needed
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col>
          <Button
            type="primary"
            onClick={goBackToList}
            style={{ marginBottom: "20px" }}
          >
            Back
          </Button>
        </Col>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
      </Row>
      <Row gutter={16}>
        <MovieListGrid
          movies={filteredMovies}
          isStarred={isStarred}
          toggleFavourite={toggleFavourite}
          handleCardClick={handleCardClick}
        />
      </Row>
    </div>
  );
}

export default FavouriteMovies;
