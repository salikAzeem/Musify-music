import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';
import './App.css'; 
import PlaylistPage from './pages/PlaylistPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />

        <div className="main-content">
          <Header />

          <div className="page-body">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
