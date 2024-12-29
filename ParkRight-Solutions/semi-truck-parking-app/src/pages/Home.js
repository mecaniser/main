import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <img src="/logo.png" alt="Logo" className="logo" />
      <h1>Right Solution Truck Parking</h1>
      <p>Find and book parking spaces for your semi trucks.</p>
      <button onClick={handleLoginClick}>Login</button>
    </div>
  );
};

export default Home;
