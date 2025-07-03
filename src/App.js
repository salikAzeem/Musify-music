import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div style={{ marginLeft: '220px', padding: '20px', flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/library" element={<LibraryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
