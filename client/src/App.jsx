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
import About from './components/Aboutus'; 
import './style.css';


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
        <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
}
export default App;
