// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create an Axios instance with defaults
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // You can add timeout, authorization headers, interceptors here if needed
});

/**
 * Utility function to extract meaningful error messages from Axios errors
 * @param {any} error - Axios error object
 * @returns {string} Extracted error message or fallback
 */
function extractErrorMessage(error) {
  if (error.response && error.response.data && error.response.data.message)
    return error.response.data.message;
  if (error.message) return error.message;
  return 'Unknown error occurred';
}

/**
 * Fetches a paginated, filtered, and/or sorted list of products
 * Supports pagination (page, limit), sorting (sortBy), and filtering by any product field
 * @param {object} params - Query parameters e.g. { page, limit, sortBy, category, name }
 * @returns {Promise<object>} Returns full response with products array and pagination info
 */
const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return response.data; // Expecting { products: [], page, totalPages, total }
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

/**
 * Get a single product by its ID
 * @param {string} id - Product ID
 * @returns {Promise<object>} Product object
 */
const getProductById = async (id) => {
  if (!id) throw new Error('Product ID is required');
  try {
    const response = await api.get(`/products/${id}`);
    return response.data; // Expecting product object
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

/**
 * Create a new product
 * @param {object} productData - New product details
 * @returns {Promise<object>} Created product
 */
const createProduct = async (productData) => {
  if (!productData) throw new Error('Product data is required');
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

/**
 * Update an existing product
 * @param {string} id - Product ID
 * @param {object} productData - Fields to update (partial update)
 * @returns {Promise<object>} Updated product
 */
const updateProduct = async (id, productData) => {
  if (!id) throw new Error('Product ID is required');
  if (!productData) throw new Error('Product data is required');
  try {
    const response = await api.patch(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

/**
 * Delete a product by its ID
 * @param {string} id - Product ID
 * @returns {Promise<object>} Response message or deleted product info
 */
const deleteProduct = async (id) => {
  if (!id) throw new Error('Product ID is required');
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
