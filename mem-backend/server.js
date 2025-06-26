// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/Product');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Debugging middleware - logs all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// MongoDB Connection 
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    // Verify products exist in DB
    Product.countDocuments({})
      .then(count => console.log(`📦 Found ${count} products in database`))
      .catch(err => console.error('Error counting products:', err));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

  mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});
mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

// Routes
console.log('Mounting product routes...');
app.use('/api/products', productRoutes);
console.log('Routes mounted successfully');

// Test route
app.get('/', (req, res) => {
  res.send('Vinoir API is running');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.get('/api/test-route', (req, res) => {
  console.log('Test route hit');
  res.json({ success: true, message: 'Route is working' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});