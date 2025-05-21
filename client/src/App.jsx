import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar'; 
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import Admin from './components/Admin';
import HotelDetails from './components/HotelDetails';
import BookingConfirm from './components/BookingConfirm';
import About from './components/Aboutus'; 
import './style.css';
import './Styles/navbar.css';
import './Styles/home.css';
import './Styles/form.css';
import './Styles/hoteldetails.css';
import './Styles/media.css';
import './Styles/profile.css';
import './Styles/bookingconfirmation.css';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/confirm" element={<BookingConfirm />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
}
export default App;
