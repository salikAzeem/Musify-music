import React, { useEffect, useState } from 'react';
import {
  fetchTopAlbums,
  fetchAlbumsByLanguage,
  fetchAlbumsByYear,
} from '../api/saavnAlbums';
import './HomeAlbums.css';

const HomeAlbums = () => {
  const [latest, setLatest] = useState([]);
  const [hindi, setHindi] = useState([]);
  const [punjabi, setPunjabi] = useState([]);
  const [english, setEnglish] = useState([]);
  const [bhojpuri, setBhojpuri] = useState([]);
  const [albums2024, setAlbums2024] = useState([]);
  const [albums2025, setAlbums2025] = useState([]);

  useEffect(() => {
    fetchTopAlbums().then(setLatest);
    fetchAlbumsByLanguage('hindi').then(setHindi);
    fetchAlbumsByLanguage('punjabi').then(setPunjabi);
    fetchAlbumsByLanguage('english').then(setEnglish);
    fetchAlbumsByLanguage('bhojpuri').then(setBhojpuri);
    fetchAlbumsByYear('2024').then(setAlbums2024);
    fetchAlbumsByYear('2025').then(setAlbums2025);
  }, []);

  const renderRow = (title, albums) => (
    <div className="album-section">
      <h3 className="album-title">{title}</h3>
      <div className="album-row">
        {albums?.slice(0, 10).map((album) => (
          <div className="album-card" key={album.id}>
            <img
              src={album.image?.[2]?.link || album.image}
              alt={album.name || album.title}
            />
            <p>{album.name || album.title}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="albums-wrapper">
      {renderRow('🔥 Latest Albums', latest)}
      {renderRow('🎶 Hindi Hits', hindi)}
      {renderRow('🈺 Punjabi Vibes', punjabi)}
      {renderRow('🎧 English Albums', english)}
      {renderRow('🅱️ Bhojpuri Top', bhojpuri)}
      {renderRow('📅 Albums of 2024', albums2024)}
      {renderRow('🗓️ Albums of 2025', albums2025)}
    </div>
  );
};

export default HomeAlbums;
