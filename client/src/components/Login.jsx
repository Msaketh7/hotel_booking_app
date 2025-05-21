import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // <-- import context
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
   const search = location.search;
  const state = location.state;
  const { login } = useContext(AuthContext); // <-- use login from context
  const redirect = new URLSearchParams(search).get('redirect');

  


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', form);
      const { token } = res.data;

      localStorage.setItem('token', token);
      login(); // <-- notify context that login happened
      alert('Login successful!');
      setForm({ email: '', password: '' });
      if (redirect) {
  navigate(redirect); // go back to the originally intended route
} else if (
  state?.from === '/confirm' &&
  state?.hotel &&
  state?.checkInDate
) {
  navigate('/confirm', {
    state: {
      hotel:state.hotel,
      checkInDate: state.checkInDate,
      checkOutDate: state.checkOutDate,
      guests: state.guests,
      rooms: state.rooms,
      finalPrice: state.finalPrice,
    },
  });
} else {
  navigate('/profile');
}
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      </form>

      <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
