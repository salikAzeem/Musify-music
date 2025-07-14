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
import TopChartsPage from './pages/TopChartsPage'; 
import RecentlyPlayedPage from './pages/RecentlyPlayedPage';
import { QueueProvider } from './context/queueContext';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';






function App() {
  return (
    <QueueProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Header />
            <div className="page-body">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/recently-played" element={<RecentlyPlayedPage />} />
                <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
                <Route path="/top-charts" element={<TopChartsPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </Router>
    </QueueProvider>
  );
}


export default App;
