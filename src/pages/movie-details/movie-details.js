import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Row, Col } from 'antd';
import MovieList from '../../statics/movielist';

const { Title, Text } = Typography;

function MovieDetails() {
  const navigate = useNavigate();
  const movieData = MovieList;
  const { id } = useParams();
  const movieId = parseInt(id, 10);
  const movie = movieData.find((movie) => movie.id === movieId);

  const goBackToList = () => {
    navigate('/list');  // Navigate to list route
  };

  if (!movie) {
    return <div>Loading...</div>; // or display a 404 page
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Button type="primary" onClick={goBackToList} style={{ marginBottom: '20px' }}>
        Back
      </Button>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={2}>{movie.name}</Title>
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]}>
        <Col span={8}>
          <Text strong>Title:</Text> {movie.title}
        </Col>
        <Col span={8}>
          <Text strong>Cast:</Text> {movie.cast}
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]}>
        <Col span={8}>
          <Text strong>Category:</Text> {movie.category}
        </Col>
        <Col span={8}>
          <Text strong>Budget:</Text> {movie.budget}
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]}>
        <Col span={8}>
          <Text strong>Release Date:</Text> {movie.releaseDate}
        </Col>
      </Row>
      {/* Add more movie details here if needed */}
    </div>
  );
}

export default MovieDetails;
