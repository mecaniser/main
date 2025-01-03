import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import MapComponent from '../components/MapComponent';
import addressesData from '../config/addresses.json';
import '../styles/global.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const addresses = addressesData.addresses;

  return (
    <div className="home-container">
      <Card>
        <img src="/logo.png" alt="Logo" />
        <h1>Right Solution Truck Parking</h1>
        <p>Find and book parking spaces for your semi trucks.</p>
        <div className="button-container">
          <button onClick={handleLoginClick}>Login</button>
          <p><a className='register-link' href="/register">Register</a></p>
        </div>
      </Card>
      <MapComponent addresses={addresses} />
    </div>
  );
};

export default Home;
