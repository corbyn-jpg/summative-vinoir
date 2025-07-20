// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  // Optional: you can add interceptors here for global token handling
});

// Utility: Unified error message extraction for Axios
function extractErrorMessage(error) {
  if (error.response && error.response.data && error.response.data.message)
    return error.response.data.message;
  if (error.message) return error.message;
  return 'Unknown error';
}

// Get all products
const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Get a single product by ID
const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Create a new product
const createProduct = async (product) => {
  try {
    const response = await api.post('/products', product);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Update an existing product
const updateProduct = async (id, product) => {
  try {
    const response = await api.patch(`/products/${id}`, product); // PATCH for partial updates
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

// Delete a product
const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
