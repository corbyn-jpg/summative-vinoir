// src/services/ProductService.js
class ProductService {
  constructor() {
    this.baseUrl = 'api/products'; 
  }

  async getAllProducts() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }
}

const productServiceInstance = new ProductService();
export default productServiceInstance;
