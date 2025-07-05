import React, { useRef, useState, useEffect } from 'react';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaChevronUp,
  FaChevronDown
} from 'react-icons/fa';
import './Player.css';

const Player = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [expanded, setExpanded] = useState(window.innerWidth > 768);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

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

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!song) return null;

  return (
    <div className={`player-bar ${expanded ? 'expanded' : 'mini'}`}>
      <div className="song-info" onClick={() => setExpanded(!expanded)}>
        <img
          src={song.image[1].url}
          alt={song.name}
          className={`song-cover ${isPlaying ? 'spin' : ''}`}
        />
        <div className="song-details">
          <h4>{song.name}</h4>
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
              {isMuted ? <FaVolumeMute className="volume-icon" /> : <FaVolumeUp className="volume-icon" />}
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
        src={song.downloadUrl[1].url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default Player;
