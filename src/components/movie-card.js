import React from "react";
import { Card, Tag, Button, Divider } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

function MovieCard({ movie, isStarred, toggleFavourite, handleCardClick }) {
  return (
    <Card
      title={movie.name}
      style={{
        width: "100%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
      }}
      actions={[
        <Tag color="blue">{movie.category}</Tag>,
        <Tag color="green">{movie.budget}</Tag>,
        <Button
          icon={isStarred(movie.id) ? <StarFilled /> : <StarOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite(movie.id);
          }}
          style={{
            color: isStarred(movie.id) ? "yellow" : "gray",
            border: "none",
          }}
        />,
      ]}
      onClick={() => handleCardClick(movie.id)}
    >
      <p>
        <strong>Title:</strong> {movie.title}
      </p>
      <Divider />
      <p>
        <strong>Cast:</strong> {movie.cast}
      </p>
      <Divider />
      <p>
        <strong>Release Date:</strong> {movie.releaseDate}
      </p>
    </Card>
  );
}

export default MovieCard;
