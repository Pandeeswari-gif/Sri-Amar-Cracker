const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getOrderById, trackOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Optional auth middleware so guests can also checkout seamlessly!
const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sri_amar_crackers_jwt_secret_2026_festive');
      req.user = await User.findById(decoded.id).select('-password');
    } catch (e) {
      // Continue as guest
    }
  }
  next();
};

router.post('/', optionalAuth, createOrder);
router.post('/track', trackOrder);
router.get('/my', protect, getMyOrders);
router.get('/:orderId', getOrderById);

module.exports = router;
