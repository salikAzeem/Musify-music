// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Only declare once
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// ✅ CORS Setup
app.use(cors({
  origin: ['https://musify-music-two.vercel.app'], // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
