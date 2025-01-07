import React, { useState } from 'react';
import '../styles/PricingCard.css';

const PricingCard = ({ title, price, duration, onBook }) => {
  const [showCallInfo, setShowCallInfo] = useState(false);

  let priceClass = '';
  if (price === '28') {
    priceClass = 'price-red';
  } else if (price === '180') {
    priceClass = 'price-gold';
  } else if (price === '260') {
    priceClass = 'price-green';
  }

  const handleButtonClick = () => {
    if (price === '260') {
      setShowCallInfo((prevShowCallInfo) => !prevShowCallInfo);
    } else {
      onBook(title, price, duration);
    }
  };

  const handleParagraphClick = () => {
    setShowCallInfo((prevShowCallInfo) => !prevShowCallInfo);
  };

  return (
    <div className="pricing-card">
      {showCallInfo ? (
        <p className="call-info" onClick={handleParagraphClick}>
          Please call us at <a href="tel:123-456-7890" className="phone-number">123-456-7890</a> for more information.
        </p>
      ) : (
        <div>
          <h3>{title}</h3>
          <p className={priceClass}>${price}</p>
          <p>{duration}</p>
          <button className={`book-now-button ${priceClass}`} onClick={handleButtonClick}>
            {price === '260' ? 'Call Now' : 'Book Now'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PricingCard;