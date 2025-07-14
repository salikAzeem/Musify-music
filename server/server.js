// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// Middleware
const cors = require('cors');

app.use(cors({
  origin: ['https://musify-music-two.vercel.app'], // ✅ your deployed frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running on port ${process.env.PORT}`)
  );
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
