import React from "react";
import { Col, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <>
      <Col span={6}>
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Col>
      <Col span={2}>
        <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
          Search
        </Button>
      </Col>
    </>
  );
}

export default SearchBar;
