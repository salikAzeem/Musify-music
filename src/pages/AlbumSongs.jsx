import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchSongs } from '../api/jiosaavn';
import SongList from '../components/SongList';
import Player from '../components/Player';
import './AlbumSongs.css';

const AlbumSongs = () => {
  const { tag } = useParams();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await searchSongs(tag);
      setSongs(res);
    };
    fetch();
  }, [tag]);

  const handlePlay = (id) => {
    const song = songs.find((s) => s.id === id);
    if (song) setCurrentSong(song);
  };

  return (
    <div className="album-page">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        <h1 className="album-title">🎵 {tag.toUpperCase()} Playlist</h1>
        <SongList songs={songs} onPlay={handlePlay} />
        <Player song={currentSong} />
      </div>
    </div>
  );
};

export default AlbumSongs;
