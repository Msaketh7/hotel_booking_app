const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require('../middlewares/auth');

// Create a booking (protected route)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.user._id  // Associate booking with logged-in user
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all bookings of current user (protected)
router.get('/my-bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router; 