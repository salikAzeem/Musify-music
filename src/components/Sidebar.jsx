import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { FaBars } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger icon for mobile */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Sidebar navigation */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="nav-links" onClick={closeSidebar}>
          <NavLink to="/" className="nav-link">
            <span className="icon">🏠</span>
            <span>Home</span>
          </NavLink>

          <NavLink to="/search" className="nav-link">
            <span className="icon">🔍</span>
            <span>Search</span>
          </NavLink>

          <NavLink to="/albums" className="nav-link">
            <span className="icon">🔥</span>
            <span>Albums</span>
          </NavLink>

          <NavLink to="/library" className="nav-link">
            <span className="icon">📁</span>
            <span>Your Library</span>
          </NavLink>

          

          <NavLink to="/recently-played" className="nav-link">
            <span className="icon">🎧</span>
            <span>Recently Played</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
