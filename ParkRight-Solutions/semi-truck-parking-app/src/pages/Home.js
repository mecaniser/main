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
      <h1>Welcome to the Truck Parking App</h1>
      <p>Find and book parking spaces for your semi trucks.</p>
      <button onClick={handleLoginClick}>Login</button>
    </div>
  );
};

export default Home;