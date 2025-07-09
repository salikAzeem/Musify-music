// src/components/Player.jsx
import React, { useRef, useState, useEffect } from 'react';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaChevronUp,
  FaChevronDown,
} from 'react-icons/fa';
import { useQueue } from '../context/queueContext';
import './Player.css';

const Player = ({ song: propSong }) => {
  const { currentSong, popNext, playSong } = useQueue();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [expanded, setExpanded] = useState(window.innerWidth > 768);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const song = propSong || currentSong;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (song) {
      const stored = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];

      const fallbackImage =
        typeof song.image === 'string'
          ? song.image
          : Array.isArray(song.image)
          ? song.image[1]?.url || song.image[0]?.url
          : '';

      const newEntry = {
        id: song.id || song.song || song.name,
        song: song.song || song.name,
        media_url: song.media_url || (song.downloadUrl && song.downloadUrl[1]?.url) || '',
        image: fallbackImage,
        language: song.language || '',
        primaryArtists: song.primaryArtists || '',
      };

      const filtered = stored.filter((s) => s.id !== newEntry.id);
      const updated = [newEntry, ...filtered].slice(0, 50);

      localStorage.setItem('recentlyPlayed', JSON.stringify(updated));
    }
  }, [song]);

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

  const toggleMute = () => setIsMuted(!isMuted);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const handleSongEnd = () => {
    const next = popNext?.();
    if (!next) {
      setIsPlaying(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!song) return null;

  const imageSrc =
    typeof song.image === 'string'
      ? song.image
      : Array.isArray(song.image)
      ? song.image[1]?.url || song.image[0]?.url
      : '';

  return (
    <div className={`player-bar ${expanded ? 'expanded' : 'mini'}`}>
      <div className="song-info" onClick={() => setExpanded(!expanded)}>
        <img
          src={imageSrc}
          alt={song.song || song.name}
          className={`song-cover ${isPlaying ? 'spin' : ''}`}
        />
        <div className="song-details">
          <h4>{song.song || song.name}</h4>
          <p>{song.primaryArtists}</p>
        </div>
        <button className="toggle-view">
          {expanded ? <FaChevronDown /> : <FaChevronUp />}
        </button>
      </div>

      {expanded && (
        <>
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
            <div className="time-info">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="volume-controls">
            <button className="mute-btn" onClick={toggleMute}>
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
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
        </>
      )}

      <audio
        ref={audioRef}
        src={song.media_url || (song.downloadUrl && song.downloadUrl[1]?.url)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleSongEnd}
        autoPlay
      />
    </div>
  );
};

export default Player;
