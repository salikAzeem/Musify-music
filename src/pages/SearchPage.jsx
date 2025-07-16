import React, { useState } from 'react';
import { searchSongs as searchJioSaavn, getSongById } from '../api/jiosaavn';
import { searchDeezerSongs, normalizeDeezerSong } from '../api/deezer';
import SearchBar from '../components/SearchBar';
import SongList from '../components/SongList';
import Player from '../components/Player';
import QueueDebugPanel from '../components/QueueDebugPanel';
import { useQueue } from '../context/queueContext';
import './SearchPage.css';

const SearchPage = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const { addToQueue } = useQueue();

  const handleSearch = async (query) => {
    const saavnSongs = await searchJioSaavn(query);
    const deezerRaw = await searchDeezerSongs(query);
    const deezerSongs = deezerRaw.map(normalizeDeezerSong);
    setSongs([...saavnSongs, ...deezerSongs]);
  };

  const handlePlay = async (id) => {
    // Check if it's a Deezer song
    if (id.startsWith('deezer-')) {
      const deezerTrack = songs.find((s) => s.id === id);
      if (deezerTrack) {
        setCurrentSong(deezerTrack);
        addToQueue(deezerTrack);
      }
    } else {
      const saavnTrack = await getSongById(id);
      setCurrentSong(saavnTrack);
      addToQueue(saavnTrack);
    }
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
          <QueueDebugPanel />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
