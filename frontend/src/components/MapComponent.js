import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const MapComponent = () => {
  const [center, setCenter] = useState(null);
  const [error, setError] = useState('');
  const mapRef = useRef(null);

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
    if (center && mapRef.current) {
      const { AdvancedMarkerElement } = google.maps.marker;
      const marker = new AdvancedMarkerElement({
        position: center,
        map: mapRef.current,
        title: 'Your Location'
      });
    }
  }, [center]);

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      {center ? (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={(map) => (mapRef.current = map)}
          />
        </LoadScript>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default MapComponent;