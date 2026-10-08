const Coupon = require('../models/Coupon');

// @desc Validate coupon code against subtotal
// @route POST /api/coupons/validate
exports.validateCoupon = async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code || code.trim() === '') {
      return res.status(400).json({ success: false, message: 'Please provide a coupon code' });
    }

    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
      isActive: true
    });

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid or inactive coupon code' });
    }

    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({ success: false, message: 'This coupon has expired' });
    }

    const orderSubtotal = Number(subtotal) || 0;
    if (coupon.minOrder && orderSubtotal < coupon.minOrder) {
      return res.status(400).json({
        success: false,
        message: `This coupon requires a minimum cart subtotal of ₹${coupon.minOrder}`
      });
    }

    let discount = Math.round((orderSubtotal * coupon.discountPercentage) / 100);
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }

    res.json({
      success: true,
      message: `Coupon "${coupon.code}" applied! You save ₹${discount}`,
      coupon: {
        code: coupon.code,
        discountPercentage: coupon.discountPercentage,
        discount,
        minOrder: coupon.minOrder,
        maxDiscount: coupon.maxDiscount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get list of public active coupons
// @route GET /api/coupons/active
exports.getActiveCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ isActive: true }).select('code discountPercentage minOrder maxDiscount');
    res.json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
