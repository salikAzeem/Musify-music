import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { searchSongs } from '../api/jiosaavn';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.length > 2) {
        const results = await searchSongs(query);
        setSuggestions(results.slice(0, 5));
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (name) => {
    setQuery(name);
    onSearch(name);
    setShowSuggestions(false);
  };

  return (
    <div className="search-wrapper">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for songs.."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(suggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          <button type="submit">Search</button>
        </div>
      </form>

      {showSuggestions && (
        <ul className="suggestion-list">
          {suggestions.map((song) => (
            <li key={song.id} onClick={() => handleSuggestionClick(song.name)}>
              <img src={song.image[1].url} alt={song.name} />
              <div>
                <strong>{song.name}</strong>
                <span>{song.primaryArtists}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
