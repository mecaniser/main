import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const MapComponent = () => {
  const [center, setCenter] = useState(null);
  const [error, setError] = useState('');
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'] // Add any additional libraries you need
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error fetching location:', error);
          setError('Failed to fetch your location. Please allow location access.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (isLoaded && center && mapRef.current) {
      const { AdvancedMarkerElement } = window.google.maps.marker;
      const marker = new AdvancedMarkerElement({
        position: center,
        map: mapRef.current,
        title: 'Your Location'
      });
    }
  }, [isLoaded, center]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      {isLoaded && center ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={(map) => (mapRef.current = map)}
        />
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default MapComponent;