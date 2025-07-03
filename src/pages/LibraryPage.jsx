import React from 'react';
import './LibraryPage.css'; // make sure you create this

const LibraryPage = () => {
  return (
    <div className="library-page">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        <h1>📁 Your Library</h1>
        <p>Feature coming soon...</p>
      </div>
    </div>
  );
};

export default LibraryPage;
