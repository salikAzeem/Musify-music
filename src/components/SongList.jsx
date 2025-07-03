import React from 'react';
import { FaPlay } from 'react-icons/fa';
import './SongList.css';

const SongList = ({ songs, onPlay }) => {
  return (
    <div className="song-grid">
      {songs.map((song) => (
        <div key={song.id} className="song-card" onClick={() => onPlay(song.id)}>
          <div className="image-container">
            <img className="song-img" src={song.image[2].url} alt={song.name} />
            <div className="play-overlay">
              <FaPlay className="play-icon" />
            </div>
          </div>
          <div className="song-info">
            <h4>{song.name}</h4>
            <p>{song.primaryArtists}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
