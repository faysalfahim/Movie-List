import React, { useState, useEffect  } from "react";
import { List, Card, Row, Col, Tag, Divider, Input, Button } from "antd";
import { SearchOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import MovieList from "../../statics/movielist";

const movieData = MovieList;

function ListComponent() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const favourites = JSON.parse(localStorage.getItem('favorites')) || {};
  const [starredMovies, setStarredMovies] = useState(favourites);
  console.log(starredMovies)


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
    localStorage.setItem('favorites',JSON.stringify(starredMovies))
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
        <Col span={2}>
          <Button type="primary"  onClick={() => {
             navigate(`/favourites`);
          }}>
            Go to favourites
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={filteredMovies}
          renderItem={(item) => (
            <List.Item>
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
                      e.stopPropagation(); // Stop propagation of the click event
                      setAsFavourite(item.id);
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

export default ListComponent;
