import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Dummy hotels data
const dummyHotels = [
  {
    id: '1',
    name: 'Ocean View Hotel',
    location: 'Miami, FL',
    price: 120, // Price per night in USD
    image: '/Ocean-View.jpg',
    rating: 4.5,
    description: 'Enjoy the beautiful ocean view from your room and relax on the beach.',
    amenities: ['Free Wi-Fi', 'Pool', 'Restaurant', 'Spa', 'Gym'],
    reviews: [
      { rating: 5, comment: 'Absolutely loved the view!' },
      { rating: 4, comment: 'Good service but could be better.' },
    ],
  },
  {
    id: '2',
    name: 'Mountain Escape Lodge',
    location: 'Denver, CO',
    price: 90, // Price per night in USD
    image: '/images/mountain.jpg',
    rating: 4.3,
    description: 'A peaceful retreat in the mountains with hiking trails and fresh air.',
    amenities: ['Free Wi-Fi', 'Bar', 'Pets Allowed'],
    reviews: [
      { rating: 4, comment: 'A bit far from the city but great nature.' },
      { rating: 5, comment: 'The perfect mountain retreat!' },
    ],
  },
  {
    id: '3',
    name: 'City Central Inn',
    location: 'New York, NY',
    price: 150, // Price per night in USD
    image: '/images/city.jpg',
    rating: 4.7,
    description: 'Located in the heart of the city, close to shopping, dining, and attractions.',
    amenities: ['Free Wi-Fi', 'Restaurant', 'Fitness Center'],
    reviews: [
      { rating: 5, comment: 'Perfect location for exploring the city!' },
      { rating: 4, comment: 'Small rooms but great location.' },
    ],
  },
];

const HotelDetails = () => {
  const { id } = useParams();
  const hotel = dummyHotels.find((h) => h.id === id);

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);

  useEffect(() => {
    // Set the check-out date when check-in date is set
    if (checkInDate) {
      const checkIn = new Date(checkInDate);
      checkIn.setDate(checkIn.getDate() + 1); // Set check-out one day after check-in
      setCheckOutDate(checkIn.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
    }
  }, [checkInDate]);

  if (!hotel) return <p>Hotel not found.</p>;

  const handleDateChange = (e) => {
    if (e.target.name === 'check-in') setCheckInDate(e.target.value);
    if (e.target.name === 'check-out') setCheckOutDate(e.target.value);
  };

  const handleGuestChange = (e) => {
    setGuests(e.target.value);
  };

  const handleRoomChange = (e) => {
    setRooms(e.target.value);
  };

  // Calculate total price
  const totalNights = checkInDate && checkOutDate ? (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 3600 * 24) : 0;
  const taxRate = 0.12; // 12% tax
  const totalPrice = hotel.price * totalNights * rooms;
  const tax = totalPrice * taxRate;
  const finalPrice = totalPrice + tax;

  return (
    <div className="hotel-details-container">
      <h2 className="hotel-title">{hotel.name}</h2>

      <div className="hotel-image-and-booking">
  <div className="hotel-image-slider">
    <img
      src={process.env.PUBLIC_URL + hotel.image}
      alt={hotel.name}
      className="hotel-image-main"
    />
  </div>
  <div className="booking-side-panel">
    <div className="hotel-selection">
      <label>Check-in Date:</label>
      <input
        type="date"
        name="check-in"
        value={checkInDate}
        onChange={handleDateChange}
        min={new Date().toISOString().split('T')[0]}
      />
    </div>

    <div className="hotel-selection">
      <label>Check-out Date:</label>
      <input
        type="date"
        name="check-out"
        value={checkOutDate}
        onChange={handleDateChange}
        min={checkInDate}
      />
    </div>

    <div className="hotel-selection">
      <label>Guests:</label>
      <select value={guests} onChange={handleGuestChange}>
        {[...Array(10).keys()].map((i) => (
          <option key={i} value={i + 1}>
            {i + 1} Guest{(i + 1) > 1 ? 's' : ''}
          </option>
        ))}
      </select>
    </div>

    <div className="hotel-selection">
      <label>Rooms:</label>
      <select value={rooms} onChange={handleRoomChange}>
        {[...Array(5).keys()].map((i) => (
          <option key={i} value={i + 1}>
            {i + 1} Room{(i + 1) > 1 ? 's' : ''}
          </option>
        ))}
      </select>
    </div>

    <div className="price-summary">
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <p>Tax (12%): ${tax.toFixed(2)}</p>
      <p><strong>Final Price: ${finalPrice.toFixed(2)}</strong></p>
    </div>

    <button className="book-now-btn">Confirm Booking</button>
  </div>
</div>
<div className="hotel-info">
          <div className="hotel-details-cards">
            <div className="hotel-card">
              <h3>Location</h3>
              <p>{hotel.location}</p>
            </div>

            <div className="hotel-card">
              <h3>Price</h3>
              <p>${hotel.price}/night</p>
            </div>

            <div className="hotel-card">
              <h3>Rating</h3>
              <p>{hotel.rating} ⭐</p>
            </div>
          </div>

          {/* Display the description in the next line */}
          <div className="hotel-description">
            <h3>Description</h3>
            <p>{hotel.description}</p>
            <p>
              This is a beautiful and luxurious hotel offering top-notch facilities. It is located in a prime area with easy access to attractions, restaurants, and shopping malls. The rooms are spacious, with modern decor and amenities to ensure a comfortable stay. Whether you're here for business or leisure, our hotel will exceed your expectations.
            </p>
          </div>
        </div>
          <h3>Amenities</h3>
<div className="amenities-grid">
  {hotel.amenities.map((amenity, index) => (
    <div key={index} className="amenity-card">
      {amenity}
    </div>
  ))}
</div>
          {/* Reviews Section */}
          <h3>Customer Reviews</h3>
          <div className="reviews">
            {hotel.reviews.map((review, index) => (
              <div key={index} className="review-item">
                <p>Rating: {review.rating} ⭐</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
  );
};

export default HotelDetails;
