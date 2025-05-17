const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require('../middlewares/auth');

// middleware Auth
router.get('/', authMiddleware, async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
  });

// POST booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all bookings
router.get('/', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

module.exports = router;
