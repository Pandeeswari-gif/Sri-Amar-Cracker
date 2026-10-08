const Wishlist = require('../models/Wishlist');

// @desc Get user's wishlist
// @route GET /api/wishlist
exports.getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }
    res.json({ success: true, wishlist: wishlist.products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Toggle or add item to wishlist
// @route POST /api/wishlist/toggle
exports.toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: 'Product ID required' });

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    const index = wishlist.products.findIndex(id => id.toString() === productId);
    let action = '';

    if (index > -1) {
      wishlist.products.splice(index, 1);
      action = 'removed';
    } else {
      wishlist.products.push(productId);
      action = 'added';
    }

    await wishlist.save();
    const updated = await Wishlist.findById(wishlist._id).populate('products');

    res.json({
      success: true,
      action,
      message: action === 'added' ? 'Product added to wishlist' : 'Product removed from wishlist',
      wishlist: updated.products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
