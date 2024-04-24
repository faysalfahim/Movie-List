import React, { useState, useEffect } from "react";
import { List, Card, Row, Col, Tag, Divider, Input, Button } from "antd";
import { SearchOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import MovieList from "../../statics/movielist";

// Mock movie data
const movieData = MovieList;

function FavouriteMovies() {
  const navigate = useNavigate();
  const favourites = JSON.parse(localStorage.getItem("favorites")) || {};
  const [searchTerm, setSearchTerm] = useState("");
  const [starredMovies, setStarredMovies] = useState(favourites);
  const [rerenderKey, setRerenderKey] = useState(Date.now()); // Unique key for rerendering

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
      setRerenderKey(Date.now()); // Update the key to force rerender
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
    navigate('/list');  // Navigate to list route
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
        <Col span={6}>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col span={2}>
          <Button type="primary" icon={<SearchOutlined />} onClick={() => {}}>
            Search
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={filteredMovies}
          renderItem={(item) => (
            <List.Item key={`${item.id}-${isStarred(item.id)}`}>
              <Card
                title={item.name}
                style={{
                  width: "100%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                }}
                actions={[
                  <Tag color="blue">{item.category}</Tag>,
                  <Tag color="green">{item.budget}</Tag>,
                  <Button
                    icon={
                      isStarred(item.id) ? <StarFilled /> : <StarOutlined />
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavourite(item.id);
                    }}
                    style={{
                      color: isStarred(item.id) ? "yellow" : "gray",
                      border: "none",
                    }}
                  />,
                ]}
                onClick={() => handleCardClick(item.id)}
              >
                <p>
                  <strong>Title:</strong> {item.title}
                </p>
                <Divider />
                <p>
                  <strong>Cast:</strong> {item.cast}
                </p>
                <Divider />
                <p>
                  <strong>Release Date:</strong> {item.releaseDate}
                </p>
              </Card>
            </List.Item>
          )}
        />
      </Row>
    </div>
  );
}

export default FavouriteMovies;
