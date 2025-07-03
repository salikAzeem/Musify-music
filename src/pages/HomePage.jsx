import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        <div className="hero-section">
          <h1 className="hero-title">Welcome to <span>Musify</span> 🎧</h1>
          <p className="hero-subtitle">Stream your favorite music with the power of the JioSaavn API</p>
          <a href="/search" className="hero-button">Start Listening</a>
        </div>

        <div className="features">
          <div className="feature-card">
            <h3>🎵 Explore Songs</h3>
            <p>Search and play trending songs, albums, and artists in one click.</p>
          </div>
          <div className="feature-card">
            <h3>🔥 Powered by JioSaavn</h3>
            <p>Using the fastest and most reliable unofficial API for music search.</p>
          </div>
          <div className="feature-card">
            <h3>🎧 Enjoy the UI</h3>
            <p>Modern, clean, and Spotify-inspired design for the best user experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
