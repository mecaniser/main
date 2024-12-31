import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
// import '../styles/Dashboard.css';

const Dashboard = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get('/api/parking-spaces'); // Relative URL
        setSpaces(response.data);
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    };
    fetchSpaces();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Your Parking Dashboard</h1>
      <div className="cards-container">
        {spaces.map((space) => (
          <Card key={space.id}>
            <h3>{space.location}</h3>
            <p>Status: {space.status}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
