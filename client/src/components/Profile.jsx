import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found, please login');
      return;
    }

    axios
      .get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => setError('Failed to load profile, please login again'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!user) return <p className="loading-message">Loading...</p>;

  const initials =
    user.firstName?.charAt(0).toUpperCase() + user.lastName?.charAt(0).toUpperCase();

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="avatar">
          {/* Replace with an image URL if you want */}
          {initials || <img src="/default-avatar.png" alt="User Avatar" />}
        </div>
        <h2>{user.firstName} {user.lastName}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobileNumber}</p>

        <div className="profile-buttons">
          <button className="edit-btn" disabled>Edit Profile</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
