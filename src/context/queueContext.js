// src/context/queueContext.js
import React, { createContext, useContext, useState } from 'react';

const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const playSong = (song) => {
    setCurrentSong(song);
    setQueue((prevQueue) => prevQueue.filter((s) => s.id !== song.id));
  };

  const addToQueue = (song) => {
    setQueue((prevQueue) => [...prevQueue, song]);
  };

  const playNext = (song) => {
    setQueue((prevQueue) => [song, ...prevQueue]);
  };

  const skip = () => {
    const next = queue[0];
    if (next) {
      setCurrentSong(next);
      setQueue((prevQueue) => prevQueue.slice(1));
    }
  };

  const popNext = () => {
    const next = queue[0];
    if (next) {
      setCurrentSong(next);
      setQueue((prevQueue) => prevQueue.slice(1));
      return next;
    }
    return null;
  };

  const getNext = () => queue[0]; // Optional peek

  return (
    <QueueContext.Provider
      value={{
        queue,
        currentSong,
        playSong,
        addToQueue,
        playNext,
        skip,
        popNext, // ✅ make available to Player
        getNext
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => useContext(QueueContext);
