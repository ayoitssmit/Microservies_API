import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

// ─── Products ───────────────────────────────────────
export const fetchProducts = () => API.get('/products');
export const fetchProductById = (id) => API.get(`/products/${id}`);

// ─── Cart ───────────────────────────────────────────
export const fetchCart = (userId) => API.get(`/cart/${userId}`);
export const addToCart = (userId, productId, quantity = 1) =>
  API.post('/cart', { userId, productId, quantity });
export const removeFromCart = (userId, productId) =>
  API.delete(`/cart/${userId}/item/${productId}`);

// ─── Orders ─────────────────────────────────────────
export const createOrder = (userId, items) =>
  API.post('/orders', { userId, items });

// ─── Users ──────────────────────────────────────────
export const fetchUsers = () => API.get('/users');
export const registerUser = (name, email, password) =>
  API.post('/users', { name, email, password });

export default API;
