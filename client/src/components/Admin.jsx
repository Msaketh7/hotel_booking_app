import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch {
        alert('Unauthorized');
      }
    };

    fetchBookings();
  }, []);
  return (
    <div style={{ padding: '40px' }}>
      <h2>Admin Dashboard</h2>
      <p>Here you can manage bookings, hotels, and users.</p>
      <ul>
        <li>✅ View Bookings</li>
        <li>✅ Add/Edit Hotels</li>
        <li>✅ Manage Users</li>
      </ul>
    </div>
  );
};

export default Admin;
