// BookingForm.jsx
import React, { useState } from 'react';

const BookingForm = () => {
  // Local state to store check-in and check-out dates
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the booking logic (e.g., calling an API to save the booking)
    alert(`Booking confirmed from ${checkIn} to ${checkOut}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <label>Check-In:</label>
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        required
      />
      <br />
      <label>Check-Out:</label>
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        required
      />
      <br />
      <button type="submit" style={{ marginTop: '10px' }}>
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
