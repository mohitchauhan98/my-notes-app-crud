import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchValue, setSearchValue}) => {
    const handleChange = (e) => {
        setSearchValue(e.target.value)
    }
    
  return (
    <>
      <div className="search-box">
        <div className="search">
          <input type="search" placeholder="Search..." value={searchValue} onChange={handleChange}/>
          <button disabled = {!searchValue}>Search</button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
