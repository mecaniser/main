import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import MapComponent from '../components/MapComponent';
import AddressCard from '../components/AddressCard';
import addressesData from '../config/addresses.json';
import '../styles/global.css';

const Home = () => {
  const navigate = useNavigate();
  const [showAddresses, setShowAddresses] = useState(false);
  const [mapCenter, setMapCenter] = useState(null);
  const [mapZoom, setMapZoom] = useState(10); // Default zoom level
  const addressCardsRef = useRef(null);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleAddressClick = async (address) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const location = results[0].geometry.location;
        setMapCenter({
          lat: location.lat(),
          lng: location.lng()
        });
        setMapZoom(15); // Set zoom level when an address is clicked
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  const handleShowAddressesClick = () => {
    setShowAddresses(!showAddresses);
    if (!showAddresses) {
      setTimeout(() => {
        addressCardsRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Delay to ensure the address cards are rendered
    }
  };

  const handleBookNowClick = (address) => {
    alert(`Booking for address: ${address}`);
    // Implement booking functionality here
  };

  const addresses = addressesData.addresses;

  return (
    <div className="home-container">
      <Card>
        <img src="/rst-logo.png" alt="Logo" className="logo" />
        <h1>Right Solution Truck Parking</h1>
        <p>Find and book parking spaces for your semi trucks.</p>
        <div className="button-container">
          <button onClick={handleLoginClick}>Login</button>
          <p><a className='register-link' href="/register">Register</a></p>
        </div>
      </Card>
      <MapComponent addresses={addresses} center={mapCenter} zoom={mapZoom} />
      <div className="button-container">
        <button onClick={handleShowAddressesClick}>
          {showAddresses ? 'Hide Locations' : 'Show Locations'}
        </button>
      </div>
      {showAddresses && (
        <div className="address-cards-container" ref={addressCardsRef}>
          {addresses.map((address, index) => (
            <AddressCard
              key={index}
              address={address}
              onClick={handleAddressClick}
              onBook={handleBookNowClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
