const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await ProductController.getProducts(req, res);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await ProductController.getProductById(req, res);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// POST create new product
router.post('/', async (req, res) => {
  try {
    const product = await ProductController.createProduct(req, res);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Error creating product' });
  }
});

// PUT update product by ID
router.put('/:id', async (req, res) => {
  try {
    const product = await ProductController.updateProduct(req, res);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// DELETE product by ID
router.delete('/:id', async (req, res) => {
  try {
    await ProductController.deleteProduct(req, res);
    res.status(204).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;