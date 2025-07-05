import React, { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './SongList.css'; // create or update styles

const SongList = ({ songs, onPlay }) => {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedSongs')) || [];
    setLikedSongs(savedLikes);
  }, []);

  const toggleLike = (song) => {
    let updatedLikes = [...likedSongs];
    const exists = likedSongs.find((s) => s.id === song.id);

    if (exists) {
      updatedLikes = likedSongs.filter((s) => s.id !== song.id);
    } else {
      updatedLikes.push(song);
    }

    setLikedSongs(updatedLikes);
    localStorage.setItem('likedSongs', JSON.stringify(updatedLikes));
  };

  return (
    <div className="song-grid">
      {songs.map((song) => (
        <div key={song.id} className="song-card">
          <div className="song-card-top" onClick={() => onPlay(song.id)}>
            <img className="song-img" src={song.image[1].url} alt={song.name} />
            <p><strong>{song.name}</strong></p>
            <p style={{ color: '#b3b3b3' }}>{song.language}</p>
          </div>

          <button
            className="like-btn"
            onClick={() => toggleLike(song)}
            title="Like this song"
          >
            {likedSongs.some((s) => s.id === song.id) ? (
              <FaHeart style={{ color: '#1db954' }} />
            ) : (
              <FaRegHeart />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SongList;
