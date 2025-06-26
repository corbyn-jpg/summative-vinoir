const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add this to verify the router is working
router.get('/test', (req, res) => {
  console.log('Product routes test endpoint hit');
  res.json({ success: true, message: 'Product routes are working' });
});

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    console.log(`\n--- Received product request for ID: ${req.params.id} ---`);
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('Invalid ID format');
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    console.log('Querying database...');
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      console.log('Product not found in database');
      return res.status(404).json({ message: 'Product not found' });
    }
    
    console.log('Product found:', product.name);
    res.json(product);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;