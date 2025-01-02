import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import ErrorBoundary from './ErrorBoundary';
import '../styles/MapComponent.css'; // Import the CSS file

// Define the libraries array outside of the component
const libraries = ['places'];

const MapComponent = () => {
  const [center, setCenter] = useState(null);
  const [error, setError] = useState('');
  const mapRef = useRef(null);

  const googleMapsApiKey = 'AIzaSyCLq8yyfcTujb6w5mBOpGEcWlKsk8c5qZg';

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries // Use the libraries constant
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
    <ErrorBoundary>
    <>
      {error && <p className="error-message">{error}</p>}
      {isLoaded && center ? (
        <GoogleMap
          mapContainerClassName="map-container-card"
          center={center}
          zoom={15}
          onLoad={(map) => (mapRef.current = map)}
        />
      ) : (
        <p className="loading-message">Loading map...</p>
      )}
    </>
    </ErrorBoundary>
  );
};

export default MapComponent;