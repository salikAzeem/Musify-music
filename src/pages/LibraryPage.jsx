import React, { useEffect, useState } from 'react';
import SongList from '../components/SongList';
import PlaylistManager from '../components/PlaylistManager';
import './LibraryPage.css';

const LibraryPage = () => {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedSongs')) || [];
    setLikedSongs(savedLikes);
  }, []);

  return (
    <div className="library-page">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/background.mp4" type="video/mp4" />
      </video>

      <div className="library-overlay">
        <h1 style={{ color: '#1db954', marginBottom: '20px' }}>💚 Liked Songs</h1>

        {likedSongs.length === 0 ? (
          <p style={{ color: '#b3b3b3' }}>You haven't liked any songs yet.</p>
        ) : (
          <SongList songs={likedSongs} onPlay={() => {}} />
        )}

        <PlaylistManager />
      </div>
    </div>
  );
};

export default LibraryPage;
