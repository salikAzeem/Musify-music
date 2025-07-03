import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* <h2 className="logo">🎵 Musify</h2> */}
      <nav className="nav-links">
        <NavLink to="/" className="nav-link">
          <span className="icon">🏠</span>
          <span>Home</span>
        </NavLink>
        <NavLink to="/search" className="nav-link">
          <span className="icon">🔍</span>
          <span>Search</span>
        </NavLink>
        <NavLink to="/library" className="nav-link">
          <span className="icon">📁</span>
          <span>Your Library</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
