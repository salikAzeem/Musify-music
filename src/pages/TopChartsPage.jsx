import React, { useEffect, useState } from 'react';
import './TopChartsPage.css'; // Optional
import Player from '../components/Player';
import SongList from '../components/SongList';

const TopChartsPage = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch('http://localhost:5100/charts');
        const data = await res.json();
        console.log("🔥 Chart API response:", data);

        if (Array.isArray(data.songs) && data.songs.length > 0) {
          setSongs(data.songs);
        } else {
          console.warn("❌ No songs found in chart:", data);
        }
      } catch (err) {
        console.error("🚫 Failed to load chart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, []);

  const handlePlay = (songId) => {
    const song = songs.find((s) => s.id === songId);
    setCurrentSong(song);
  };

  return (
    <div className="top-charts-page">
      <h1 style={{ color: '#1db954', marginBottom: '20px' }}>🔥 Top Romantic Hits</h1>
      {loading ? (
        <p style={{ color: '#bbb' }}>Loading chart...</p>
      ) : songs.length === 0 ? (
        <p style={{ color: '#bbb' }}>No songs found in the chart.</p>
      ) : (
        <SongList songs={songs} onPlay={handlePlay} />
      )}

      <Player song={currentSong} />
    </div>
  );
};

export default TopChartsPage;
