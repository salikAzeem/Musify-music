import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSongById } from '../api/jiosaavn';
import SongList from '../components/SongList';
import Player from '../components/Player';
import './PlaylistPage.css';

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
    const selected = storedPlaylists.find((p) => p.id === playlistId);
    setPlaylist(selected);
  }, [playlistId]);

  const handlePlay = async (songId) => {
    const song = await getSongById(songId);
    setCurrentSong(song);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(playlist, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${playlist.name}.json`;
    link.click();
  };

  if (!playlist) return <p style={{ color: '#ccc' }}>Playlist not found</p>;

  return (
    <div className="playlist-page">
      <video autoPlay loop muted playsInline className="playlist-background">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="playlist-overlay">
        <h1 style={{ color: '#1db954' }}>{playlist.name} 🎧</h1>

        {playlist.songs.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button className="play-all-btn" onClick={() => handlePlay(playlist.songs[0]?.id)}>
              ▶️ Play All
            </button>

            <button className="export-btn" onClick={handleExport}>
              📤 Export Playlist
            </button>
          </div>
        )}

        {playlist.songs.length === 0 ? (
          <p style={{ color: '#bbb' }}>This playlist has no songs yet.</p>
        ) : (
          <SongList songs={playlist.songs} onPlay={handlePlay} />
        )}

        <Player song={currentSong} />
      </div>
    </div>
  );
};

export default PlaylistPage;
