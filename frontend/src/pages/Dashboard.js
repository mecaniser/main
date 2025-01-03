import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [spaces, setSpaces] = useState([]);
  const [error, setError] = useState('');
  const [newAddress, setNewAddress] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get('/api/parking-spaces'); // Relative URL
        setSpaces(response.data);
      } catch (error) {
        console.error('Error fetching spaces:', error);
        setError('Failed to fetch parking spaces. Please try again later.');
      }
    };
    fetchSpaces();
  }, []);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/parking-spaces', newAddress);
      setSpaces([...spaces, response.data]);
      setNewAddress({ address: '', city: '', state: '', zipCode: '' });
      setShowForm(false); // Hide the form after adding the address
    } catch (error) {
      console.error('Error adding address:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        setError(`Failed to add address. Server responded with status code ${error.response.status}.`);
      } else if (error.request) {
        console.error('Request data:', error.request);
        setError('Failed to add address. No response received from server.');
      } else {
        console.error('Error message:', error.message);
        setError('Failed to add address. Please try again later.');
      }
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`/api/parking-spaces/${id}`);
      setSpaces(spaces.filter(space => space._id !== id));
    } catch (error) {
      console.error('Error deleting address:', error);
      setError('Failed to delete address. Please try again later.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <div className="dashboard-container">
        <h1>Your Parking Dashboard</h1>
        {error && <p className="error-message">{error}</p>}
        <button id='addAddress' onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Address'}
        </button>
        {showForm && (
          <form onSubmit={handleAddAddress} className="add-address-form">
            <input
              type="text"
              name="address"
              value={newAddress.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
            <input
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />
            <input
              type="text"
              name="state"
              value={newAddress.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
            />
            <input
              type="text"
              name="zipCode"
              value={newAddress.zipCode}
              onChange={handleChange}
              placeholder="Enter zip code"
              required
            />
            <button type="submit">Submit</button>
          </form>
        )}
        <div className="cards-container">
          {spaces.map((space) => (
            <Card key={space._id}>
              <h3>{space.address}</h3>
              <p>{space.city}, {space.state} {space.zipCode}</p>
              <p>Status: {space.status}</p>
              <button onClick={() => handleDeleteAddress(space._id)}>Delete</button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
