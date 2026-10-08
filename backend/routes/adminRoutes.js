const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAdminOrders,
  updateOrderStatus,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCustomers,
  getAdminReviews,
  moderateReview,
  getCoupons,
  createCoupon,
  deleteCoupon
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// All routes in this router require protect + admin
router.use(protect, admin);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Orders
router.get('/orders', getAdminOrders);
router.put('/orders/:id/status', updateOrderStatus);

// Products
router.get('/products', getAdminProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Customers
router.get('/customers', getCustomers);

// Reviews
router.get('/reviews', getAdminReviews);
router.put('/reviews/:id', moderateReview);

// Coupons
router.get('/coupons', getCoupons);
router.post('/coupons', createCoupon);
router.delete('/coupons/:id', deleteCoupon);

module.exports = router;
