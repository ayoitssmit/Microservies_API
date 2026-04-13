import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Add Interceptor for JWT tokens
API.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
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
export const fetchUserOrders = (userId) => API.get(`/orders/user/${userId}`);

// ─── Users & Auth ───────────────────────────────────
export const fetchUsers = () => API.get('/users');
export const registerUser = (name, email, password) =>
  API.post('/users', { name, email, password });
export const loginUser = (email, password) => 
  API.post('/users/login', { email, password });

export default API;
