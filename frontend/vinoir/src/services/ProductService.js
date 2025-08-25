import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

function normalize(product) {
  if (!product) return product;
  return { ...product, id: product.id || product._id };
}

export const getProducts = async (params = {}) => {
  const res = await api.get('/products', { params });
  return Array.isArray(res.data) ? res.data.map(normalize) : res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return normalize(res.data);
};