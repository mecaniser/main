import React, { useState } from 'react';
import '../styles/StateCard.css';

const StateCard = ({ title, state, availableLots, onClick }) => {
  const [showCallInfo, setShowCallInfo] = useState(false);

  let stateClass = '';
  if (state === 'NC') {
    stateClass = 'state-red';
  } else if (state === 'SC') {
    stateClass = 'state-gold';
  } else if (state === 'CO') {
    stateClass = 'state-green';
  }

  return (
    <div className="state-card" onClick={() => onClick(state)}>
      {showCallInfo ? (
        <p className="call-info">
          Please call us at <a href="tel:123-456-7890" className="phone-number">123-456-7890</a> for more information.
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
