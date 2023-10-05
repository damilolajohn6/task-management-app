import React, { useState } from "react";
import "./Other.css"

const SearchBar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form className="search-bar-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchBar;
