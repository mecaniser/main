import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TopNavBar.css';

const TopNavBar = () => {
  const location = useLocation();

  return (
    <nav className="top-nav-bar">
      {location.pathname !== '/' && <Link to="/">Home</Link>}
      {/* Add more links as needed */}
    </nav>
  );
};

export default TopNavBar;