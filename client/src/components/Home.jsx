import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const dummyHotels = [
  {
    id: '1',
    name: 'Ocean View Hotel',
    location: 'Miami, FL',
    price: '$120/night',
    image: '/Ocean-view.jpg',
    rating: 4.5,
    description: 'Enjoy the beautiful ocean view from your room and relax on the beach.',
  },
  {
    id: '2',
    name: 'Mountain Escape Lodge',
    location: 'Denver, CO',
    price: '$90/night',
    image: '/mountain_lodge.jpg',
    rating: 4.3,
    description: 'A peaceful retreat in the mountains with hiking trails and fresh air.',
  },
  {
    id: '3',
    name: 'City Central Inn',
    location: 'New York, NY',
    price: '$150/night',
    image: '/citycentre.jpg',
    rating: 4.7,
    description: 'Located in the heart of the city, close to shopping, dining, and attractions.',
  },
];

const Home = () => {
  const [search, setSearch] = useState('');

  // Filter hotels based on search input
  const filteredHotels = dummyHotels.filter(hotel =>
    hotel.name.toLowerCase().includes(search.toLowerCase()) ||
    hotel.location.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className='home'>
      <video autoPlay muted loop className="background-video">
        <source src="./Heartbeat.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
    <div className="home-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for hotels..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="hotel-list">
        {filteredHotels.length === 0 ? (
          <p>No hotels found.</p>
        ) : (
          filteredHotels.map((hotel, index) => (
            <div className="hotel-card" key={index}>
              <img src={hotel.image} alt={hotel.name} className="hotel-image" />
              <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <p className="hotel-location">{hotel.location}</p>
                <p className="hotel-price">{hotel.price}</p>
                <p className="hotel-description">{hotel.description}</p>
                <div className="hotel-rating">
                  <span>Rating: {hotel.rating}⭐</span>
                </div>
                <Link to={`/hotels/${hotel.id}`}>
                <button className="book-now-btn">Book Now</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default Home;
