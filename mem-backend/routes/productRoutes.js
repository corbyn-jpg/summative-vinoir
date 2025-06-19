// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    console.log('Fetching products from DB...');
    const products = await Product.find({});
    console.log(`Found ${products.length} products`);
    res.json(products);
  } catch (err) {
    console.error('Product fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

module.exports = router;