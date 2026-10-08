const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Review = require('../models/Review');
const Coupon = require('../models/Coupon');

// @desc Get comprehensive admin dashboard analytics
// @route GET /api/admin/dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({});
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalProducts = await Product.countDocuments({});

    // Revenue calculation
    const revenueAgg = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'Cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    // Order status breakdown
    const pendingOrders = await Order.countDocuments({
      orderStatus: { $in: ['Order Placed', 'Confirmed', 'Processing', 'Packed'] }
    });
    const completedOrders = await Order.countDocuments({ orderStatus: 'Delivered' });
    const cancelledOrders = await Order.countDocuments({ orderStatus: 'Cancelled' });

    // Low stock products (stock <= 50)
    const lowStockCount = await Product.countDocuments({ stock: { $lte: 50 }, isActive: true });
    const lowStockItems = await Product.find({ stock: { $lte: 50 }, isActive: true })
      .select('productNumber name category stock')
      .limit(8);

    // Recent orders
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .select('orderId customerDetails total paymentMethod orderStatus createdAt');

    // Status distribution
    const statusCounts = await Order.aggregate([
      { $group: { _id: '$orderStatus', count: { $sum: 1 } } }
    ]);

    // Category breakdown
    const categoryDistribution = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalRevenue,
        totalCustomers,
        totalProducts,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        lowStockCount,
        lowStockItems,
        recentOrders,
        statusCounts,
        categoryDistribution
      }
    });
  } catch (error) {
    console.error('Admin Dashboard Stats Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all orders for admin
// @route GET /api/admin/orders
exports.getAdminOrders = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.orderStatus = status;
    }

    if (search && search.trim() !== '') {
      const s = search.trim();
      query.$or = [
        { orderId: new RegExp(s, 'i') },
        { 'customerDetails.name': new RegExp(s, 'i') },
        { 'customerDetails.phone': new RegExp(s, 'i') }
      ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update order status with timeline note
// @route PUT /api/admin/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;

    const validStatuses = [
      'Order Placed',
      'Confirmed',
      'Processing',
      'Packed',
      'Shipped',
      'Out for Delivery',
      'Delivered',
      'Cancelled'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid order status value' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.orderStatus = status;
    order.statusHistory.push({
      status,
      timestamp: new Date(),
      note: note || `Status updated to ${status} by admin`
    });

    if (status === 'Delivered') {
      order.paymentStatus = 'Completed';
    }

    await order.save();

    res.json({
      success: true,
      message: `Order #${order.orderId} updated to "${status}"`,
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all products for admin
// @route GET /api/admin/products
exports.getAdminProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};

    if (search && search.trim() !== '') {
      const s = search.trim();
      query.$or = [
        { name: new RegExp(s, 'i') },
        { productNumber: !isNaN(Number(s)) ? Number(s) : -1 }
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    const products = await Product.find(query).sort({ productNumber: 1 });
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create product
// @route POST /api/admin/products
exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Find next product number if not supplied
    if (!productData.productNumber) {
      const lastProduct = await Product.findOne({}).sort({ productNumber: -1 });
      productData.productNumber = lastProduct ? lastProduct.productNumber + 1 : 1;
    }

    const product = await Product.create(productData);
    res.status(201).json({ success: true, message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update product
// @route PUT /api/admin/products/:id
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    Object.assign(product, req.body);
    await product.save();

    res.json({ success: true, message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete product
// @route DELETE /api/admin/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all customers
// @route GET /api/admin/customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' })
      .select('-password')
      .sort({ createdAt: -1 });

    const customersWithOrders = await Promise.all(
      customers.map(async (c) => {
        const orderCount = await Order.countDocuments({ user: c._id });
        const orders = await Order.find({ user: c._id });
        const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
        return {
          ...c.toObject(),
          orderCount,
          totalSpent
        };
      })
    );

    res.json({ success: true, count: customersWithOrders.length, customers: customersWithOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get reviews for moderation
// @route GET /api/admin/reviews
exports.getAdminReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate('product', 'name productNumber').sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Moderate review (approve/hide)
// @route PUT /api/admin/reviews/:id
exports.moderateReview = async (req, res) => {
  try {
    const { isApproved } = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, { isApproved }, { new: true });
    res.json({ success: true, message: 'Review moderation updated', review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Manage coupons (CRUD)
// @route GET /api/admin/coupons
exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ success: true, message: 'Coupon created successfully', coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
