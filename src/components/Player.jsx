import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';
import './Player.css';

const Player = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    setProgress(progressPercent || 0);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    setProgress(e.target.value);
  };

  if (!song) return null;

  return (
    <div className="player-bar">
      <div className="song-info">
        <img src={song.image[1].url} alt={song.name} className="song-cover" />
        <div className="song-details">
          <h4>{song.name}</h4>
          <p>{song.primaryArtists}</p>
        </div>
      </div>

      <div className="audio-controls">
        <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <input
          type="range"
          className="progress-bar"
          value={progress}
          onChange={handleSeek}
        />
      </div>

      <div className="volume-controls">
        <FaVolumeUp className="volume-icon" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="volume-slider"
        />
      </div>

      <audio
        ref={audioRef}
        src={song.downloadUrl[1].url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default Player;
