const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ProductService = {
  getProductById: async (id) => {
    try {
      console.log(`Making request to: ${API_BASE_URL}/products/${id}`);
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('API Error Response:', data);
        throw new Error(data.message || 'Product not found');
      }
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch product');
      }
      
      return data.data;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      throw new Error(error.message || 'Failed to fetch product details. Please try again later.');
    }
  },
  
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }
};

export default ProductService;