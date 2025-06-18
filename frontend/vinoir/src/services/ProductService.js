class ProductService {
  constructor() {
    this.baseUrl = 'http://localhost:5000/api/products';
  }

  async getAllProducts() {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  }

  async getProductById(id) {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  }
}

// Assign the instance to a variable before exporting
const productServiceInstance = new ProductService();
export default productServiceInstance;