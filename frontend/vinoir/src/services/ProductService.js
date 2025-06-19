// src/services/ProductService.js
class ProductService {
  constructor() {
    this.baseUrl = '/api/products'; // relative path for proxy support
  }

  async getAllProducts() {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  }

  async getProductById(id) {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  }
}

const productServiceInstance = new ProductService();
export default productServiceInstance;
