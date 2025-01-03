import React from 'react';
import '../styles/PricingCard.css';

const PricingCard = ({ title, price, duration, onBook }) => {
  let priceClass = '';
  if (price === '30') {
    priceClass = 'price-red';
  } else if (price === '180') {
    priceClass = 'price-gold';
  } else if (price === '260') {
    priceClass = 'price-green';
  }

  return (
    <div className="pricing-card">
      <h3>{title}</h3>
      <p className={priceClass}>${price}</p>
      <p>{duration}</p>
      <button className={`book-now-button ${priceClass}`} onClick={() => onBook(title, price, duration)}>Book Now</button>
    </div>
  );
};

export default PricingCard;