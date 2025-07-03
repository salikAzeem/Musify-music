import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>© {new Date().getFullYear()} Musify · Powered by Sheikh</p>
    </footer>
  );
};

export default Footer;
