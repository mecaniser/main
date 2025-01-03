import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import ErrorBoundary from './ErrorBoundary';
import '../styles/MapComponent.css'; // Import the CSS file

const MapComponent = ({ addresses, center, zoom }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [markers, setMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState(center);
  const [mapZoom, setMapZoom] = useState(zoom);
  const [error, setError] = useState(null);
  const mapRef = useRef();

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
          setMapCenter(markerLocations[0]); // Center the map on the first address
        } catch (error) {
          console.error(error);
          setError('Failed to geocode one or more addresses.');
        }
      }
    };

    geocodeAddresses();
  }, [isLoaded, addresses]);

  useEffect(() => {
    if (center) {
      setMapCenter(center);
    }
  }, [center]);

  useEffect(() => {
    if (zoom) {
      setMapZoom(zoom);
    }
  }, [zoom]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  const customIcon = {
    url: `${process.env.PUBLIC_URL}/rst-favicon-32x32.png`, // URL to the custom marker icon in the public folder
    scaledSize: isLoaded && new window.google.maps.Size(32, 32),
  };

  return (
    <ErrorBoundary>
      <>
        {error && <p className="error-message">{error}</p>}
        {isLoaded && mapCenter ? (
          <GoogleMap
            mapContainerClassName="map-container-card"
            center={mapCenter}
            zoom={mapZoom}
            onLoad={(map) => (mapRef.current = map)}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker}
                icon={customIcon}
              />
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