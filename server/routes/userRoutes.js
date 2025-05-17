const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path is correct
const authMiddleware = require('../middlewares/auth');

// ✅ Updated register route with password hashing
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobileNumber } = req.body;
      const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    } 

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobileNumber
    });
    console.log('User created:', user); // Log success

    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ message: 'Registration error', error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login error', error: err.message });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get profile' });
  }
});

module.exports = router;
