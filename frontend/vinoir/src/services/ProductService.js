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

function authHeader() {
  const token = localStorage.getItem('vinoir_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const createProduct = async (data) => {
  const res = await api.post('/products', data, { headers: { ...authHeader() } });
  return normalize(res.data);
};

export const updateProduct = async (id, data) => {
  const res = await api.patch(`/products/${id}`, data, { headers: { ...authHeader() } });
  return normalize(res.data);
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`, { headers: { ...authHeader() } });
  return res.data;
};

export const uploadImage = async (file, folder = 'vinoir/products') => {
  const form = new FormData();
  form.append('file', file);
  form.append('folder', folder);
  const res = await axios.post(`${API_BASE}/upload`, form, {
    headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' }
  });
  return res.data; // { url, public_id, ... }
};