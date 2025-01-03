import React from 'react';
import '../styles/ServicesCard.css';

const services = [
  'Mechanical Services',
  'Truck Battery Replacement',
  'Truck Tire Replacement',
  // 'Real-time Parking Space Availability',
  'Secure and Well-maintained Parking Facilities',
];

const ServicesCard = () => {
  return (
    <div className="services-cards-container">
      {services.map((service, index) => (
        <div key={index} className="service-card">
          <p>{service}</p>
        </div>
      ))}
    </div>
  );
};
export default ServicesCard;