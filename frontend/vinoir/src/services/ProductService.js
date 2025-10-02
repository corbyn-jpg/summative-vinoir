import axios from 'axios';
import { API_BASE } from '../config/api';

const api = axios.create({
  baseURL: API_BASE,
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