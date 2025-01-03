import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import ErrorBoundary from './ErrorBoundary';
import '../styles/MapComponent.css'; // Import the CSS file

// Define the libraries array outside of the component
const libraries = ['places'];

const MapComponent = ({ addresses }) => {
  const [center, setCenter] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState('');
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
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
    const geocodeAddresses = async () => {
      if (isLoaded && addresses.length > 0) {
        const geocoder = new window.google.maps.Geocoder();
        const markerPromises = addresses.map(address => {
          return new Promise((resolve, reject) => {
            geocoder.geocode({ address }, (results, status) => {
              if (status === 'OK') {
                const location = results[0].geometry.location;
                resolve({
                  lat: location.lat(),
                  lng: location.lng()
                });
              } else {
                reject('Geocode was not successful for the following reason: ' + status);
              }
            });
          });
        });

        try {
          const markerLocations = await Promise.all(markerPromises);
          setMarkers(markerLocations);
          setCenter(markerLocations[0]); // Center the map on the first address
        } catch (error) {
          console.error(error);
          setError('Failed to geocode one or more addresses.');
        }
      }
    };

    geocodeAddresses();
  }, [isLoaded, addresses]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  const customIcon = {
    url: `${process.env.PUBLIC_URL}/logo1.png`, // URL to the custom marker icon in the public folder
    scaledSize: isLoaded && new window.google.maps.Size(40, 40),
  };

  return (
    <ErrorBoundary>
      <>
        {error && <p className="error-message">{error}</p>}
        {isLoaded && center ? (
          <GoogleMap
            mapContainerClassName="map-container-card"
            center={center}
            zoom={10}
            onLoad={(map) => (mapRef.current = map)}
          >
            {markers.map((marker, index) => (
              <Marker key={index} position={marker} title={`Location ${index + 1}`} icon={customIcon} />
            ))}
          </GoogleMap>
        ) : (
          <p className="loading-message">Loading map...</p>
        )}
      </>
    </ErrorBoundary>
  );
};

export default MapComponent;