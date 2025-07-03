import React, { useState } from 'react';
import { searchSongs, getSongById } from '../api/jiosaavn';
import SearchBar from '../components/SearchBar';
import SongList from '../components/SongList';
import Player from '../components/Player';
import './SearchPage.css';

const SearchPage = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const handleSearch = async (query) => {
    const results = await searchSongs(query);
    setSongs(results);
  };

  const handlePlay = async (id) => {
    const song = await getSongById(id);
    setCurrentSong(song);
  };

  return (
    <div className="search-page">
      <h1 className="search-header">🔍 Search Your Music</h1>
      <SearchBar onSearch={handleSearch} />

      <div className="search-results">
        <SongList songs={songs} onPlay={handlePlay} />
        <Player song={currentSong} />
      </div>
    </div>
  );
};

export default SearchPage;
