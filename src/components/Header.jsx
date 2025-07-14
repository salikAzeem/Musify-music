import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  const { auth, logout } = useAuth();

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo-wrapper">
          <img src={logo} alt="Musify Logo" className="site-logo" />
          <span className="site-name">Musify</span>
        </div>

        <nav className="auth-nav">
          {auth?.user ? (
            <>
              <span className="welcome-text">Welcome, {auth.user.username}</span>
              <button className="auth-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-btn">Login</Link>
              <Link to="/register" className="auth-btn">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
