import React, { useState } from 'react';
import '../styles/BookingModal.css';

const BookingModal = ({ address, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ address, name, email });
  };

  return (
    <div className="booking-modal">
      <div className="booking-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Book Now</h2>
        <p>Address: {address}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;