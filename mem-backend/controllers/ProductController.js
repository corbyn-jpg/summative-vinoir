const Product = require('../models/Product');

class ProductController {
  /**
   * Get all products
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      return products; // Return products to be sent by the route
    } catch (err) {
      throw new Error('Error fetching products');
    }
  }

  /**
   * Get a single product by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product; // Return product to be sent by the route
    } catch (err) {
      throw new Error('Error fetching product');
    }
  }

  /**
   * Create a new product
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createProduct(req, res) {
    try {
      const product = new Product(req.body);
      await product.save();
      return product; // Return created product to be sent by the route
    } catch (err) {
      throw new Error('Error creating product: ' + err.message);
    }
  }

  /**
   * Update a product
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateProduct(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!product) {
        throw new Error('Product not found');
      }
      return product; // Return updated product to be sent by the route
    } catch (err) {
      throw new Error('Error updating product: ' + err.message);
    }
  }

  /**
   * Delete a product
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteProduct(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        throw new Error('Product not found');
      }
      return; // Return nothing (204 No Content)
    } catch (err) {
      throw new Error('Error deleting product: ' + err.message);
    }
  }
}

module.exports = new ProductController();