import axios from 'axios';
import { productsData } from '../data/productsData';
import { categoriesData } from '../data/categoriesData';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sri_amar_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Fallback handlers if backend is booting / cold-starting
export const fetchProducts = async (params = {}) => {
  try {
    const res = await api.get('/products', { params });
    if (res.data && res.data.products) return res.data;
  } catch (err) {
    console.warn('Backend unavailable, using catalog dataset fallback:', err.message);
  }

  // Client-side fallback filter & search
  let filtered = [...productsData];
  if (params.category && params.category !== 'All') {
    filtered = filtered.filter(p =>
      p.category.toLowerCase() === params.category.toLowerCase() ||
      p.categorySlug === params.category.toLowerCase()
    );
  }
  if (params.search) {
    const q = params.search.toLowerCase().trim();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      String(p.productNumber) === q
    );
  }
  if (params.isCombo === 'true' || params.isCombo === true) {
    filtered = filtered.filter(p => p.isCombo);
  } else if (params.isCombo === 'false' || params.isCombo === false) {
    filtered = filtered.filter(p => !p.isCombo);
  }
  if (params.sort === 'price-asc') {
    filtered.sort((a, b) => (a.offerPrice || 99999) - (b.offerPrice || 99999));
  } else if (params.sort === 'price-desc') {
    filtered.sort((a, b) => (b.offerPrice || 0) - (a.offerPrice || 0));
  } else if (params.sort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filtered.sort((a, b) => a.productNumber - b.productNumber);
  }

  return {
    success: true,
    total: filtered.length,
    page: 1,
    totalPages: 1,
    products: filtered
  };
};

export const fetchProductById = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    if (res.data && res.data.product) return res.data;
  } catch (err) {
    console.warn('Backend fetch product error, using catalog fallback');
  }

  const product = productsData.find(p => p._id === id || String(p.productNumber) === String(id));
  if (product) {
    const related = productsData.filter(p => p.category === product.category && p.productNumber !== product.productNumber).slice(0, 4);
    return {
      success: true,
      product,
      reviews: [],
      relatedProducts: related
    };
  }
  throw new Error('Product not found');
};

export const fetchProductByNumber = async (num) => {
  try {
    const res = await api.get(`/products/number/${num}`);
    if (res.data && res.data.product) return res.data;
  } catch (err) {
    // Fallback
  }
  const product = productsData.find(p => p.productNumber === Number(num));
  if (product) return { success: true, product };
  throw new Error(`Product #${num} not found`);
};

export const searchProductsInstant = async (query) => {
  try {
    const res = await api.get('/products/search/instant', { params: { q: query } });
    if (res.data && res.data.products) return res.data.products;
  } catch (err) {
    // Fallback
  }
  const q = query.toLowerCase().trim();
  return productsData.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    String(p.productNumber) === q
  ).slice(0, 10);
};

export const fetchCategories = async () => {
  try {
    const res = await api.get('/categories');
    if (res.data && res.data.categories) return res.data.categories;
  } catch (err) {
    console.warn('Backend categories error, using fallback');
  }
  return categoriesData.map(cat => ({
    ...cat,
    count: productsData.filter(p => p.category === cat.name).length
  }));
};

// Authentication
export const loginUser = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put('/auth/profile', data);
  return res.data;
};

export const addAddress = async (data) => {
  const res = await api.post('/auth/address', data);
  return res.data;
};

export const deleteAddress = async (addressId) => {
  const res = await api.delete(`/auth/address/${addressId}`);
  return res.data;
};

// Orders
export const placeOrder = async (orderData) => {
  const res = await api.post('/orders', orderData);
  return res.data;
};

export const fetchMyOrders = async () => {
  const res = await api.get('/orders/my');
  return res.data;
};

export const fetchOrderById = async (orderId) => {
  const res = await api.get(`/orders/${orderId}`);
  return res.data;
};

export const trackOrderPublic = async (orderId, phone) => {
  const res = await api.post('/orders/track', { orderId, phone });
  return res.data;
};

// Coupons
export const validateCouponCode = async (code, subtotal) => {
  const res = await api.post('/coupons/validate', { code, subtotal });
  return res.data;
};

export const fetchActiveCoupons = async () => {
  try {
    const res = await api.get('/coupons/active');
    return res.data.coupons;
  } catch (e) {
    return [
      { code: 'DIWALI50', discountPercentage: 5, minOrder: 1500 },
      { code: 'SPARKLE10', discountPercentage: 10, minOrder: 3000 }
    ];
  }
};

// Reviews
export const fetchProductReviews = async (productId) => {
  const res = await api.get(`/reviews/product/${productId}`);
  return res.data;
};

export const postReview = async (reviewData) => {
  const res = await api.post('/reviews', reviewData);
  return res.data;
};

// Wishlist
export const fetchWishlist = async () => {
  const res = await api.get('/wishlist');
  return res.data;
};

export const toggleWishlistApi = async (productId) => {
  const res = await api.post('/wishlist/toggle', { productId });
  return res.data;
};

// Admin
export const fetchDashboardStats = async () => {
  const res = await api.get('/admin/dashboard');
  return res.data;
};

export const fetchAdminOrders = async (params) => {
  const res = await api.get('/admin/orders', { params });
  return res.data;
};

export const updateOrderStatusApi = async (id, status, note) => {
  const res = await api.put(`/admin/orders/${id}/status`, { status, note });
  return res.data;
};

export const fetchAdminProducts = async (params) => {
  const res = await api.get('/admin/products', { params });
  return res.data;
};

export const createProductApi = async (productData) => {
  const res = await api.post('/admin/products', productData);
  return res.data;
};

export const updateProductApi = async (id, productData) => {
  const res = await api.put(`/admin/products/${id}`, productData);
  return res.data;
};

export const deleteProductApi = async (id) => {
  const res = await api.delete(`/admin/products/${id}`);
  return res.data;
};

export const fetchCustomersApi = async () => {
  const res = await api.get('/admin/customers');
  return res.data;
};

export const fetchAdminReviews = async () => {
  const res = await api.get('/admin/reviews');
  return res.data;
};

export const moderateReviewApi = async (id, isApproved) => {
  const res = await api.put(`/admin/reviews/${id}`, { isApproved });
  return res.data;
};

export const fetchCouponsApi = async () => {
  const res = await api.get('/admin/coupons');
  return res.data;
};

export const createCouponApi = async (couponData) => {
  const res = await api.post('/admin/coupons', couponData);
  return res.data;
};

export const deleteCouponApi = async (id) => {
  const res = await api.delete(`/admin/coupons/${id}`);
  return res.data;
};

export default api;
