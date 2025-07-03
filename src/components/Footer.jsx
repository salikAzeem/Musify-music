import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>© {new Date().getFullYear()} Musify · Developed by Salik Azeem</p>
    </footer>
  );
};

export default Footer;
