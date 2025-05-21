
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel, checkInDate, checkOutDate, guests} = location.state || {};

  if (!hotel) return <p>No booking information found.</p>;

  return (
    <div className="booking-confirmation-container">
      <h2>Confirm Your Booking</h2>
      <p><strong>Hotel:</strong> {hotel.name}</p>
      <p><strong>Location:</strong> {hotel.location}</p>
      <p><strong>Check-in Date:</strong> {checkInDate}</p>
      <p><strong>Check-out Date:</strong> {checkOutDate}</p>
      <p><strong>Number of Guests:</strong> {guests}</p>
      <p><strong>Price per Night:</strong> ${hotel.price}</p>
      <p><strong>Rating:</strong> {hotel.rating} ⭐</p>

      <button onClick={() => alert("Booking Confirmed!")}>
        Confirm Booking
      </button>
      <button onClick={() => navigate(-1)} style={{ marginLeft: '1rem' }}>
        Cancel
      </button>
    </div>
  );
};

export default BookingConfirmation;
