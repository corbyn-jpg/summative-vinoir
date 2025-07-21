// src/services/ProductService.js
class ProductService {
  constructor() {
    // Allow REACT_APP_API_URL overrides, fallback to proxy
    this.baseUrl =
      process.env.REACT_APP_API_URL
        ? `${process.env.REACT_APP_API_URL}/products`
        : '/api/products';
  }

  async getAllProducts() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch products (status ${response.status})`);
      }
      return await response.json();
    } catch (error) {
      console.error('ProductService.getAllProducts:', error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        const message = await response.text();
        throw new Error(
          `Failed to fetch product ${id} (status ${response.status}): ${message}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error(`ProductService.getProductById(${id}):`, error);
      throw error;
    }
  }
}

const productServiceInstance = new ProductService();
export default productServiceInstance;
