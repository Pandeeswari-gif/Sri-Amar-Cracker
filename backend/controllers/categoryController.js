const Category = require('../models/Category');
const Product = require('../models/Product');

// @desc Get all categories with product counts
// @route GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ order: 1 });

    // Calculate product counts dynamically
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({
          category: cat.name,
          isActive: true
        });
        return {
          ...cat.toObject(),
          count
        };
      })
    );

    res.json({
      success: true,
      categories: categoriesWithCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
