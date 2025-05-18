import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/about">About Us</Link>
      </div>

      <div className="nav-right">
        {token ? (
          <>
            <Link to="/profile">
              <FaUserCircle size={22} style={{ marginRight: '6px' }} />
              Profile
            </Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-link">
            <FaUserCircle size={22} style={{ marginRight: '6px' }} />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
