import React, { useEffect, useState } from 'react';
import './RecentlyPlayedPage.css';
import SongList from '../components/SongList';
import Player from '../components/Player';

const RecentlyPlayedPage = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];
    setSongs(recent.reverse()); // show most recent first
  }, []);

  const handlePlay = (id) => {
    const song = songs.find((s) => s.id === id);
    setCurrentSong(song);
  };

  return (
    <div className="recently-played-page">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        <h1 className="recently-header">🎧 Recently Played</h1>

        {songs.length > 0 ? (
          <SongList songs={songs} onPlay={handlePlay} />
        ) : (
          <p style={{ color: '#bbb' }}>You haven't played any songs yet.</p>
        )}

        <Player song={currentSong} />
      </div>
    </div>
  );
};

export default RecentlyPlayedPage;
