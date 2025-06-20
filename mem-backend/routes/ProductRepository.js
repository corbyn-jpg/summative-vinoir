const Product = require('../models/Product');

class ProductRepository {
  async getAllProducts() {
    return Product.find(); // Fetch all products
  }

  async getProductById(productId) {
    return Product.findById(productId); // Fetch product by ID
  }

  async createProduct(productData) {
    const product = new Product(productData);
    return product.save(); // Create a new product
  }

  async deleteProduct(productId) {
    return Product.findByIdAndDelete(productId); // Delete product by ID
  }

  async updateProduct(productId, updateData) {
    return Product.findByIdAndUpdate(productId, updateData, { new: true }); // Update product by ID
  }
}

module.exports = new ProductRepository();