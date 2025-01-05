import React from 'react';
import Card from './Card';

const BookingConfirmation = ({ bookingDetails }) => {
  return (
    <Card>
      <div className="booking-confirmation">
        <h2>Booking Confirmed!</h2>
        <p>Thank you for your booking, {bookingDetails.name}.</p>
        <p><strong>Parking Location:</strong> {bookingDetails.parkingLocation || bookingDetails.title}</p>
        <p><strong>Email:</strong> {bookingDetails.email}</p>
        <p><strong>Price:</strong> {bookingDetails.price}</p>
        <p><strong>Duration:</strong> {bookingDetails.startDate}</p>
      </div>
    </Card>
  );
};

export default BookingConfirmation;