import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";
import MovieList from "../../statics/movielist";
import MovieListGrid from "../../components/list";
import SearchBar from "../../components/search-bar";

const movieData = MovieList;

function MovieListComponent() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const favourites = JSON.parse(localStorage.getItem("favorites")) || {};
  const [starredMovies, setStarredMovies] = useState(favourites);
  console.log(starredMovies);

  const handleCardClick = (movieId) => {
    navigate(`/details/${movieId}`);
  };

  const setAsFavourite = (movieId) => {
    setStarredMovies((prevStarredMovies) => {
      const isCurrentlyFavourite = prevStarredMovies[movieId] || false;
      return {
        ...prevStarredMovies,
        [movieId]: !isCurrentlyFavourite,
      };
    });
  };
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(starredMovies));
  }, [starredMovies]);

  const isStarred = (movieId) => {
    return starredMovies[movieId];
  };

  const filteredMovies = movieData.filter(
    (movie) =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.cast.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Col span={2}>
          <Button
            type="primary"
            onClick={() => {
              navigate(`/favourites`);
            }}
          >
            Go to favourites
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <Row gutter={16}>
          <MovieListGrid
            movies={filteredMovies}
            isStarred={isStarred}
            toggleFavourite={setAsFavourite}
            handleCardClick={handleCardClick}
          />
        </Row>
      </Row>
    </div>
  );
}

export default MovieListComponent;
