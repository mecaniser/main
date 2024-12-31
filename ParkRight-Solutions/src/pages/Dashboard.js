import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get('/api/parking-spaces'); // API to get parking spaces
        setSpaces(response.data);
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    };
    fetchSpaces();
  }, []);

  return (
    <div>
      <h1>Your Parking Dashboard</h1>
      <ul>
        {spaces.map((space) => (
          <li key={space.id}>
            {space.location} - {space.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
