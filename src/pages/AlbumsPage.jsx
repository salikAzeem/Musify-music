// src/pages/AlbumsPage.jsx
import React from 'react';
import './AlbumsPage.css';
import { Link } from 'react-router-dom';

const categories = [
  { title: 'Hindi Hits', tag: 'hindi' },
  { title: 'Punjabi Beats', tag: 'punjabi' },
  { title: 'Romantic Songs', tag: 'romantic' },
  { title: 'Trending Now', tag: 'trending' },
  { title: 'Top 2024', tag: '2024' },
  { title: 'Bhojpuri Vibes', tag: 'bhojpuri' },
  { title: 'English Pop', tag: 'english' },
];

const AlbumsPage = () => {
  return (
    <div className="albums-page">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        <h1 className="albums-header">🎶 Explore Playlists</h1>
        <div className="album-categories">
          {categories.map((cat) => (
            <Link to={`/albums/${cat.tag}`} key={cat.tag} className="album-box">
              {cat.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumsPage;
