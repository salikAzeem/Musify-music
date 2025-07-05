import React, { useEffect, useState } from 'react';
import './PlaylistManager.css';
import { Link } from 'react-router-dom';

const PlaylistManager = ({ onSelectPlaylist }) => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('playlists')) || [];
    setPlaylists(stored);
  }, []);

  const saveToLocalStorage = (updated) => {
    localStorage.setItem('playlists', JSON.stringify(updated));
    setPlaylists(updated);
  };

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) return;
    const newPlaylist = {
      id: Date.now().toString(),
      name: newPlaylistName,
      songs: [],
    };
    const updated = [...playlists, newPlaylist];
    saveToLocalStorage(updated);
    setNewPlaylistName('');
  };

  const deletePlaylist = (id) => {
    const updated = playlists.filter((p) => p.id !== id);
    saveToLocalStorage(updated);
  };

  const renamePlaylist = (id) => {
    const newName = prompt('Enter new name for playlist:');
    if (!newName) return;

    const updated = playlists.map((p) =>
      p.id === id ? { ...p, name: newName } : p
    );

    saveToLocalStorage(updated);
  };

  return (
    <div className="playlist-wrapper">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="playlist-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="playlist-manager">
        <h2>🎵 Your Playlists</h2>

        <div className="create-playlist">
          <input
            type="text"
            placeholder="New playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button onClick={createPlaylist}>Create</button>
        </div>

        {playlists.length === 0 ? (
          <p style={{ color: '#b3b3b3' }}>No playlists yet.</p>
        ) : (
          <ul className="playlist-list">
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <Link to={`/playlist/${playlist.id}`} className="playlist-link">
                  {playlist.name}
                </Link>
                <button onClick={() => deletePlaylist(playlist.id)}>🗑️</button>
                <button onClick={() => renamePlaylist(playlist.id)}>✏️</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlaylistManager;
