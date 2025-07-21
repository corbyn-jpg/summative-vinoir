// src/services/productService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function extractErrorMessage(error) {
  if (
    error.response &&
    error.response.data &&
    error.response.data.message
  )
    return error.response.data.message;
  if (error.message) return error.message;
  return 'Unknown error occurred';
}

// Fetch (paginated and/or filtered) list of products
const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data; // { products, total, ... }
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Fetch product by ID
const getProductById = async (id) => {
  if (!id) throw new Error('Product ID is required');
  try {
    const response = await api.get(`/products/${id}`);
    return response.data; // product object
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export { getProducts, getProductById };
