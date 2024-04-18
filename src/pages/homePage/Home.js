import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import SearchBox from "../../components/SearchBox/SearchBox";

const Home = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setData(response.data);
        console.log("hey", response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userId.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [data, searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const highlightText = (text, query) => {
    if (typeof text !== "string") return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="home-container">
        <h2 className="search-header">Search</h2>
      <SearchBox value={searchQuery} onChange={handleSearchInputChange} />
      <p>
        <span className="bold-text">{searchResults.length} {searchResults.length === 1 ? "post was" : "posts were"}</span>{" "}
        found
      </p>
      <div className="search-results">
        {searchResults.map((item) => (
          <div className="display-data" key={item.id}>
            <h2>{highlightText(item.userId.toString(), searchQuery)}</h2>
            <h2>{highlightText(item.title, searchQuery)}</h2>
            <p>{highlightText(item.body, searchQuery)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
