const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc Get reviews for product
// @route GET /api/reviews/product/:productId
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      isApproved: true
    }).sort({ createdAt: -1 });

    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Add a review (Authenticated)
// @route POST /api/reviews
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Please provide product, rating and review text' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id
    });

    if (existingReview) {
      existingReview.rating = Number(rating);
      existingReview.comment = comment.trim();
      await existingReview.save();
      return res.json({ success: true, message: 'Review updated successfully', review: existingReview });
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      userName: req.user.name,
      rating: Number(rating),
      comment: comment.trim(),
      isApproved: true // Auto-approved by default, admin can moderate
    });

    // Update product rating
    const allReviews = await Review.find({ product: productId, isApproved: true });
    const avgRating = allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length;
    product.rating = Number(avgRating.toFixed(1));
    product.numReviews = allReviews.length;
    await product.save();

    res.status(201).json({ success: true, message: 'Thank you for your review!', review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
