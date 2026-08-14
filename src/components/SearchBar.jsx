import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ searchItem, onSearchChange }) => {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          value={searchItem}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search books by title, author, or keyword..."
          className="search-input"
          id="book-search-input"
          aria-label="Search books"
        />
        {searchItem && (
          <button
            className="search-clear-btn"
            onClick={() => onSearchChange("")}
            title="Clear search"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;