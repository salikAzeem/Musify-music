// ✅ QueueDebugPanel.jsx
import React from 'react';
import { useQueue } from '../context/queueContext';

const QueueDebugPanel = () => {
  const { queue, currentIndex } = useQueue();

  return (
    <div style={{ marginTop: '40px', background: '#111', padding: '20px', borderRadius: '10px' }}>
      <h3 style={{ color: '#1db954' }}>
        🧾 Queue Debug Panel
      </h3>
      {queue.length === 0 ? (
        <p style={{ color: '#aaa' }}>Queue is empty.</p>
      ) : (
        <ol style={{ color: '#ccc', fontSize: '14px' }}>
          {queue.map((song, index) => (
            <li key={song.id || index} style={{ marginBottom: '8px', color: index === currentIndex ? '#1db954' : '#ccc' }}>
              <strong>{song.song || song.name}</strong> — <em>{song.primaryArtists || song.language || 'Unknown'}</em>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default QueueDebugPanel;
