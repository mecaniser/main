import React from 'react';
import { useLocation } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo-title">
        <div className="logo-header">
          <img src="favicon-32x32.png" alt="Logo" />
        </div>
        <h1 className="title">Right Solution Truck Parking</h1>
      </div>
      {location.pathname !== '/' && <TopNavBar />}
    </header>
  );
};

export default Header;