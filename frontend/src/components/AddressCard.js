import React from 'react';
import '../styles/AddressCard.css';

const AddressCard = ({ address, onClick, onBook }) => {
  let street = '';
  let city = '';
  let state = '';
  let zipCode = '';

  if (address) {
    const addressParts = address.split(', ');
    if (addressParts.length === 3) {
      street = addressParts[0];
      const cityStateZip = addressParts[1] + ', ' + addressParts[2];
      const cityStateZipParts = cityStateZip.split(', ');
      if (cityStateZipParts.length === 2) {
        city = cityStateZipParts[0];
        const stateZipParts = cityStateZipParts[1].split(' ');
        if (stateZipParts.length === 2) {
          state = stateZipParts[0];
          zipCode = stateZipParts[1];
        }
      }
    }
  }

  return (
    <div className="address-card" onClick={() => onClick(address)}>
      <h3>{street}</h3>
      <p>{city}, {state} {zipCode}</p>
      <button className="book-now-button" onClick={(e) => { e.stopPropagation(); onBook(address); }}>Book Now</button>
    </div>
  );
};

export default AddressCard;