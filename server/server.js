const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes'); // ADD THIS

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes); // ✅ MOUNT THIS

//DB CONNECTION
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log('MongoDB connected');
  
  // Start server only after successful DB connection
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
