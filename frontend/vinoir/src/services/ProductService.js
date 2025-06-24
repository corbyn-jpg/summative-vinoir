class ProductService {
  async getAllProducts() {
    const response = await fetch('http://localhost:5000/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }

  async getProductById(id) {
    const response = await fetch(`http://localhost:5000/api/products/${id}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  }
}

const productService = new ProductService();
export default productService;
