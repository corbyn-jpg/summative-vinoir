const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/**
 * @route   GET /api/products
 * @desc    Get all products, with optional filtering, pagination, and sorting
 * @access  Public
 * 
 * Query params supported (optional): 
 *   - page (default: 1) 
 *   - limit (default: 20)
 *   - sortBy (e.g., price, -name)
 *   - ...any Product-schema filter fields
 */
router.get('/', async (req, res) => {
  try {
    // Basic pagination
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 20, 1);
    const skip = (page - 1) * limit;

    // Optional sorting support
    const sort = req.query.sortBy
      ? req.query.sortBy.split(',').join(' ')
      : '-createdAt';

    // Remove special query params for filter
    const filter = { ...req.query };
    delete filter.page;
    delete filter.limit;
    delete filter.sortBy;

    // Build the DB query
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Optionally: Provide a total count for paginated clients
    const total = await Product.countDocuments(filter);

    res.json({
      products,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (err) {
    console.error('[Product GET ALL]', err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

module.exports = router;
