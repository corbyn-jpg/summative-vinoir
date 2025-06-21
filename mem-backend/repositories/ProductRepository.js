const Product = require('../models/Product');

class ProductRepository {
  constructor() {
    this.Product = Product;
  }

  // Get all products with optional filtering
  async getAll({ category = null, searchQuery = '', page = 1, limit = 10 }) {
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (searchQuery) {
      query.$text = { $search: searchQuery };
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.Product.find(query)
        .skip(skip)
        .limit(limit),
      this.Product.countDocuments(query)
    ]);

    return {
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }

  // Get product by ID
  async getById(productId) {
    return this.Product.findById(productId);
  }

  // Get featured products
  async getFeatured(limit = 5) {
    return this.Product.find({ featured: true }).limit(limit);
  }

  // Update product stock
  async updateStock(productId, quantityChange) {
    return this.Product.findByIdAndUpdate(
      productId,
      { $inc: { stock: quantityChange } },
      { new: true }
    );
  }

  // Create new product
  async create(productData) {
    const product = new this.Product(productData);
    return product.save();
  }

  // Update product
  async update(productId, updateData) {
    return this.Product.findByIdAndUpdate(productId, updateData, { new: true });
  }

  // Delete product
  async delete(productId) {
    return this.Product.findByIdAndDelete(productId);
  }
}

module.exports = new ProductRepository();