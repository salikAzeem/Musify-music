import React, { useEffect, useState } from 'react';
import SongList from '../components/SongList';
import './LibraryPage.css'; // Make sure this CSS file exists

const LibraryPage = () => {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedSongs')) || [];
    setLikedSongs(savedLikes);
  }, []);

  return (
    <div className="library-page">
      {/* 🎥 Background video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="library-overlay">
        <h1 style={{ color: '#1db954', marginBottom: '20px' }}>💚 Liked Songs</h1>

        {likedSongs.length === 0 ? (
          <p style={{ color: '#b3b3b3' }}>You haven't liked any songs yet.</p>
        ) : (
          <SongList songs={likedSongs} onPlay={() => {}} />
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
