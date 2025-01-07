import React, { useState } from 'react';
import '../styles/StateCard.css';

const StateCard = ({ title, state, availableLots }) => {
  const [showCallInfo, setShowCallInfo] = useState(false);

  let stateClass = '';
  if (state === 'NC') {
    stateClass = 'state-blue';
  } else if (state === 'SC') {
    stateClass = 'state-purple';
  } else if (state === 'CO') {
    stateClass = 'state-orange';
  }

  const handleParagraphClick = () => {
    setShowCallInfo((prevShowCallInfo) => !prevShowCallInfo);
  };

  const handlePhoneNumberClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="state-card">
      {showCallInfo ? (
        <p className="call-info" onClick={handleParagraphClick}>
          Please call us at <a href="tel:123-456-7890" className="phone-number" onClick={handlePhoneNumberClick}>123-456-7890</a> for more information.
        </p>
      ) : (
        <div>
          <h3>{title}</h3>
          <p className={stateClass}>{state}</p>
          <p>Available Lots: {availableLots}</p>
        </div>
      )}
    </div>
  );
};

export default StateCard;
