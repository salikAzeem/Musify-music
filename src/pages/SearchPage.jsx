import React, { useState } from 'react';
import { searchSongs, getSongById } from '../api/jiosaavn';
import SearchBar from '../components/SearchBar';
import SongList from '../components/SongList';
import Player from '../components/Player';
import './SearchPage.css';
import QueueDebugPanel from '../components/QueueDebugPanel';
import { useQueue } from '../context/queueContext'; // ✅ Import the queue hook

const SearchPage = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const { addToQueue } = useQueue(); // ✅ Get addToQueue function

  const handleSearch = async (query) => {
    const results = await searchSongs(query);
    setSongs(results);
  };

  const handlePlay = async (id) => {
    const song = await getSongById(id);
    setCurrentSong(song);
    addToQueue(song); // ✅ Add to queue when played
  };

  return (
    <div className="search-page">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="search-overlay">
        <h1 className="search-header">🔍 Search Your Music</h1>
        <SearchBar onSearch={handleSearch} onPlay={handlePlay} />

        <div className="search-results">
          <SongList songs={songs} onPlay={handlePlay} />
          <Player song={currentSong} />
          <QueueDebugPanel /> {/* ✅ Show the queue */}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
