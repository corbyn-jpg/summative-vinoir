// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL, // e.g. https://your-frontend.com
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());

// --- Ensure JWT_SECRET is present ---
if (!process.env.JWT_SECRET) {
  console.warn('⚠️  Warning: JWT_SECRET environment variable is not set.');
}

// MongoDB Connection (robust version, waits before app.listen)
async function connectAndStart() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      
    });
    console.log('✅ MongoDB connected successfully');

  // Routes (API)
    app.use('/api/products', require('./routes/productRoutes'));
    app.use('/api/users', require('./routes/userRoutes'));
    app.use('/api/wishlist', require('./routes/wishlistRoutes'));

  // In case we later decide to serve the React build from here (Option B)
  // we could uncomment this block after copying the build folder:
  // const path = require('path');
  // if (process.env.SERVE_FRONTEND === 'true') {
  //   const buildPath = path.join(__dirname, '../frontend/vinoir/build');
  //   app.use(express.static(buildPath));
  //   app.get('*', (req, res) => {
  //     res.sendFile(path.join(buildPath, 'index.html'));
  //   });
  // }

    // Health check route
    app.get('/', (req, res) => {
      res.send('Vinoir API is running');
    });

    // 404 Handler
    app.use((req, res) => {
      res.status(404).json({ message: 'Route not found' });
    });

    // Generic Error Handler
    app.use((err, req, res, next) => {
      console.error('🔥 Server error:', err);
      res.status(500).json({ message: 'Internal server error' });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit node process if DB fails
  }
}

connectAndStart();
