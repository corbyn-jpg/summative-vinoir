const mongoose = require('mongoose');
const Product = require('../models/Product');

class ProductController {
  // GET all products (optionally: support filtering/pagination later)
  async getAllProducts(req, res) {
    try {
      const products = await Product.find().lean();
      return res.json(products);
    } catch (err) {
      console.error('[ProductController] getAllProducts:', err);
      return res.status(500).json({ message: 'Error fetching products' });
    }
  }

  // GET single product by ID
  async getProductById(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }
      const product = await Product.findById(id).lean();
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json(product);
    } catch (err) {
      console.error('[ProductController] getProductById:', err);
      return res.status(500).json({ message: 'Error fetching product' });
    }
  }

  // POST create new product
  async createProduct(req, res) {
    try {
      const product = new Product(req.body);
      await product.save();
      return res.status(201).json(product);
    } catch (err) {
      console.error('[ProductController] createProduct:', err);
      return res.status(400).json({ message: 'Error creating product', error: err.message });
    }
  }

  // PATCH/PUT update product
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, lean: true });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json(product);
    } catch (err) {
      console.error('[ProductController] updateProduct:', err);
      return res.status(400).json({ message: 'Error updating product', error: err.message });
    }
  }

  // DELETE product
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(204).send(); // No content
    } catch (err) {
      console.error('[ProductController] deleteProduct:', err);
      return res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
  }
}

module.exports = new ProductController();
