import React from "react";
import { List } from "antd";
import MovieCard from "./movie-card";

function MovieListGrid({ movies, isStarred, toggleFavourite, handleCardClick }) {
  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={movies}
      renderItem={(movie) => (
        <List.Item key={`${movie.id}-${isStarred(movie.id)}`}>
          <MovieCard
            movie={movie}
            isStarred={isStarred}
            toggleFavourite={toggleFavourite}
            handleCardClick={handleCardClick}
          />
        </List.Item>
      )}
    />
  );
}

export default MovieListGrid;
