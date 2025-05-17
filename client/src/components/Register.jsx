import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', form);
      console.log(response.data); 
      alert('Registered successfully!');
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message); 
      alert('Registration failed.');
    }
  };

  return (
    <div className="page-container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="row">
            <div className="form-group">
              <input
                name="firstName"
                placeholder=" "
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <label>First Name</label>
            </div>
            <div className="form-group">
              <input
                name="lastName"
                placeholder=" "
                value={form.lastName}
                onChange={handleChange}
                required
              />
              <label>Last Name</label>
            </div>
          </div>

          <div className="form-group">
            <input
              name="mobileNumber"
              placeholder=" "
              value={form.mobileNumber}
              onChange={handleChange}
              required
            />
            <label>Mobile Number</label>
          </div>

          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder=" "
              value={form.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>

          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder=" "
              value={form.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>

          <button type="submit">Register</button>

          <p style={{ marginTop: '1rem' }}>
            Already have an account? <Link to="/login">Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
