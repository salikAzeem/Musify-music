import React from 'react';
import './SongList.css';

const SongList = ({ songs, onPlay }) => {
  return (
    <div className="song-grid">
      {songs.map((song) => (
        <div key={song.id} className="song-card" onClick={() => onPlay(song.id)}>
          <img className="song-img" src={song.image[2].url} alt={song.name} />
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
