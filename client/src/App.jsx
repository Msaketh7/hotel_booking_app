import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Admin from './components/Admin';
import HotelDetails from './components/HotelDetails';
import About from './components/Aboutus'; 
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './style.css';


function Navbar() {
  return (
    <nav>
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/about">About Us</Link>
      </div>

      <div className="nav-right">
        <Link to="/login" className="login-link">
          <FaUserCircle size={24} style={{ marginRight: '8px' }} />
          Login
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
}
export default App;
