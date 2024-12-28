import React from 'react';
import { Link } from 'react-router-dom';
import './TopNavBar.css';

const TopNavBar = () => {
  return (
    <nav className="top-nav-bar">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      {/* Add more links as needed */}
    </nav>
  );
};

export default TopNavBar;