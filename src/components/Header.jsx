import React from 'react';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo-wrapper">
        <img src={logo} alt="Musify Logo" className="site-logo" />
        <span className="site-name">Musify</span>
      </div>
    </header>
  );
};

export default Header;
