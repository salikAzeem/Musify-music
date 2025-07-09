import React, { useState, useEffect } from 'react';
import { FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa';
import './SongList.css';
import { useQueue } from '../context/queueContext'; // ✅ Import queue

const SongList = ({ songs, onPlay }) => {
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);
  const { addToQueue, playNext } = useQueue(); // ✅ Use queue context

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedSongs')) || [];
    setLikedSongs(savedLikes);

    const storedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
    setPlaylists(storedPlaylists);
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

  const handleAddToPlaylist = (song, playlistId) => {
    const updated = playlists.map((p) => {
      if (p.id === playlistId && !p.songs.find((s) => s.id === song.id)) {
        return { ...p, songs: [...p.songs, song] };
      }
      return p;
    });

    localStorage.setItem('playlists', JSON.stringify(updated));
    setPlaylists(updated);
    setShowDropdown(null);
  };

  const getImage = (song) => {
    if (typeof song.image === 'string') return song.image;
    if (Array.isArray(song.image)) return song.image[1]?.url || song.image[0]?.url;
    return '';
  };

  return (
    <div className="song-grid">
      {songs.map((song) => (
        <div key={song.id || song.song} className="song-card">
          <div className="song-card-top" onClick={() => onPlay(song.id || song.song)}>
            <img className="song-img" src={getImage(song)} alt={song.song || song.name} />
            <div className="song-info">
              <h4>{song.song || song.name}</h4>
              <p>{song.language}</p>
            </div>
          </div>

          <div className="song-actions">
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

            <button
              className="playlist-btn"
              onClick={() => setShowDropdown(showDropdown === song.id ? null : song.id)}
            >
              ➕ Add to Playlist
            </button>

            <button
              className="queue-btn"
              onClick={() => addToQueue(song)}
              title="Add to Queue"
            >
              ➕ Queue
            </button>

            <button
              className="next-btn"
              onClick={() => playNext(song)}
              title="Play Next"
            >
              ⏭️ Next
            </button>
          </div>

          {showDropdown === song.id && (
            <div className="playlist-dropdown">
              {playlists.length === 0 ? (
                <div className="playlist-item disabled">No playlists yet</div>
              ) : (
                playlists.map((pl) => (
                  <div
                    key={pl.id}
                    className="playlist-item"
                    onClick={() => handleAddToPlaylist(song, pl.id)}
                  >
                    {pl.name}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SongList;
