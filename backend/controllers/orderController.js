const Order = require('../models/Order');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');

// Generate unique order ID
const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-4);
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `SAC-2026-${timestamp}${randomNum}`;
};

// @desc Create new order
// @route POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      customerDetails,
      paymentMethod = 'COD',
      couponCode,
      notes
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
    }

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.pinCode) {
      return res.status(400).json({ success: false, message: 'Please provide a complete shipping address' });
    }

    if (!customerDetails || !customerDetails.name || !customerDetails.phone) {
      return res.status(400).json({ success: false, message: 'Please provide customer name and phone number' });
    }

    let subtotal = 0;
    const validatedItems = [];

    // Validate each item and check stock
    for (const item of items) {
      // Find product by id or productNumber
      let product = null;
      if (item.product) {
        product = await Product.findById(item.product);
      }
      if (!product && item.productNumber) {
        product = await Product.findOne({ productNumber: item.productNumber });
      }

      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.name || item.productNumber} not found` });
      }

      if (!product.isAvailable || product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Product "${product.name}" is currently unavailable or exceeds available stock (Current stock: ${product.stock})`
        });
      }

      // Check for CALL or NET NET items
      const isPriced = !product.isCall && !product.isNetNet && product.offerPrice != null;
      const unitPrice = isPriced ? product.offerPrice : 0;
      const itemSubtotal = unitPrice * item.quantity;
      subtotal += itemSubtotal;

      validatedItems.push({
        product: product._id,
        productNumber: product.productNumber,
        name: product.name,
        category: product.category,
        packType: product.packType,
        packQuantity: product.packQuantity,
        price: unitPrice,
        quantity: item.quantity,
        image: product.images && product.images[0] ? product.images[0] : '',
        isCall: product.isCall,
        isNetNet: product.isNetNet
      });

      // Deduct stock
      product.stock = Math.max(0, product.stock - item.quantity);
      if (product.stock === 0) product.isAvailable = false;
      await product.save();
    }

    // Delivery calculation: Free delivery above ₹3000, else ₹150 nominal
    const deliveryCharge = subtotal >= 3000 || subtotal === 0 ? 0 : 150;

    // Apply coupon discount if any
    let discount = 0;
    let appliedCoupon = null;
    if (couponCode && couponCode.trim() !== '') {
      appliedCoupon = await Coupon.findOne({
        code: couponCode.trim().toUpperCase(),
        isActive: true
      });

      if (appliedCoupon) {
        const meetsMin = !appliedCoupon.minOrder || subtotal >= appliedCoupon.minOrder;
        const notExpired = !appliedCoupon.expiryDate || new Date(appliedCoupon.expiryDate) > new Date();

        if (meetsMin && notExpired) {
          discount = Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
          if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
            discount = appliedCoupon.maxDiscount;
          }
        }
      }
    }

    const total = Math.max(0, subtotal + deliveryCharge - discount);
    const orderId = generateOrderId();

    const order = await Order.create({
      orderId,
      user: req.user ? req.user._id : null,
      customerDetails,
      shippingAddress,
      items: validatedItems,
      subtotal,
      deliveryCharge,
      discount,
      couponCode: appliedCoupon ? appliedCoupon.code : '',
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : (paymentMethod === 'WHATSAPP' ? 'Pending' : 'Pending'),
      orderStatus: 'Order Placed',
      statusHistory: [
        {
          status: 'Order Placed',
          timestamp: new Date(),
          note: 'Order successfully placed. Awaiting store confirmation from Sivakasi office.'
        }
      ],
      adminNotes: notes || ''
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! Let happiness sparkle always.',
      order
    });
  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get current customer's orders
// @route GET /api/orders/my
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get order by orderId
// @route GET /api/orders/:orderId
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      $or: [
        { orderId: req.params.orderId },
        { _id: req.params.orderId.match(/^[0-9a-fA-F]{24}$/) ? req.params.orderId : null }
      ]
    }).populate('items.product', 'name images packType');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Customer can only view their own order unless they track it by orderId
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Public order tracking by Order ID and Phone
// @route POST /api/orders/track
exports.trackOrder = async (req, res) => {
  try {
    const { orderId, phone } = req.body;
    if (!orderId) {
      return res.status(400).json({ success: false, message: 'Please provide your Order ID' });
    }

    const query = { orderId: orderId.trim().toUpperCase() };
    if (phone && phone.trim() !== '') {
      query['customerDetails.phone'] = new RegExp(phone.trim().slice(-10));
    }

    const order = await Order.findOne(query);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'No order found matching the provided Order ID. Please verify and try again.'
      });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
