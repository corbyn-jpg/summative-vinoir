const mongoose = require('mongoose');
const Product = require('../models/Product');

class ProductRepository {
  async getAllProducts(filter = {}, options = {}) {
    // Allow optional filters, lean-read, and sorting/pagination options
    return Product.find(filter, null, options).lean();
  }

  async getProductById(productId) {
    if (!mongoose.isValidObjectId(productId)) return null;
    return Product.findById(productId).lean();
  }

  async createProduct(productData) {
    const product = new Product(productData);
    return product.save();
  }

  async deleteProduct(productId) {
    if (!mongoose.isValidObjectId(productId)) return null;
    return Product.findByIdAndDelete(productId).lean();
  }

  async updateProduct(productId, updateData) {
    if (!mongoose.isValidObjectId(productId)) return null;
    return Product.findByIdAndUpdate(productId, updateData, { new: true, lean: true });
  }
}

module.exports = new ProductRepository();
