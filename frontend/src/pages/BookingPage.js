import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingPage = () => {
  const [availableSpaces, setAvailableSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);

  useEffect(() => {
    const fetchAvailableSpaces = async () => {
      try {
        const response = await axios.get('/api/available-spaces'); // API to fetch available spaces
        setAvailableSpaces(response.data);
      } catch (error) {
        console.error('Error fetching available spaces:', error);
      }
    };
    fetchAvailableSpaces();
  }, []);

  const handleBooking = async () => {
    if (selectedSpace) {
      try {
        const response = await axios.post('/api/book', { spaceId: selectedSpace.id });
        alert('Booking successful!');
      } catch (error) {
        console.error('Error booking space:', error);
      }
    }
  };

  return (
    <div>
      <h1>Book Your Parking Spot</h1>
      <select onChange={(e) => setSelectedSpace(e.target.value)}>
        <option value="">Select Parking Space</option>
        {availableSpaces.map((space) => (
          <option key={space.id} value={space.id}>
            {space.location} - {space.price}
          </option>
        ))}
      </select>
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default BookingPage;
