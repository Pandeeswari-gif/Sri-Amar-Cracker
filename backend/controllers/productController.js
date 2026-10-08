const Product = require('../models/Product');
const Review = require('../models/Review');

// @desc Get all products with filtering, searching, sorting & pagination
// @route GET /api/products
exports.getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      isOffer,
      isCombo,
      isFeatured,
      isBestSeller,
      sort,
      page = 1,
      limit = 100
    } = req.query;

    const query = { isActive: true };

    // Search filter
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      const isNum = !isNaN(Number(search.trim()));
      if (isNum) {
        query.$or = [
          { productNumber: Number(search.trim()) },
          { name: searchRegex },
          { category: searchRegex },
          { description: searchRegex }
        ];
      } else {
        query.$or = [
          { name: searchRegex },
          { category: searchRegex },
          { description: searchRegex }
        ];
      }
    }

    // Category filter
    if (category && category !== 'All' && category !== 'all') {
      const catRegex = new RegExp(`^${category.replace(/-/g, ' ')}$`, 'i');
      query.$or = [
        { category: catRegex },
        { categorySlug: category.toLowerCase().trim() }
      ];
    }

    // Combo filter
    if (isCombo !== undefined) {
      query.isCombo = isCombo === 'true';
    }

    // Featured / Best Seller
    if (isFeatured === 'true') query.isFeatured = true;
    if (isBestSeller === 'true') query.isBestSeller = true;

    // Price range filter
    if (minPrice || maxPrice) {
      query.offerPrice = {};
      if (minPrice) query.offerPrice.$gte = Number(minPrice);
      if (maxPrice) query.offerPrice.$lte = Number(maxPrice);
    }

    // Sorting
    let sortOptions = { productNumber: 1 };
    if (sort === 'price-asc') sortOptions = { offerPrice: 1 };
    else if (sort === 'price-desc') sortOptions = { offerPrice: -1 };
    else if (sort === 'name-asc') sortOptions = { name: 1 };
    else if (sort === 'name-desc') sortOptions = { name: -1 };
    else if (sort === 'number-asc') sortOptions = { productNumber: 1 };
    else if (sort === 'newest') sortOptions = { createdAt: -1 };

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      products
    });
  } catch (error) {
    console.error('Get Products Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single product by ID
// @route GET /api/products/:id
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const reviews = await Review.find({ product: product._id, isApproved: true }).sort({ createdAt: -1 });
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true
    }).limit(4);

    res.json({
      success: true,
      product,
      reviews,
      relatedProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get product by product number (1 to 117)
// @route GET /api/products/number/:number
exports.getProductByNumber = async (req, res) => {
  try {
    const product = await Product.findOne({ productNumber: Number(req.params.number) });
    if (!product) {
      return res.status(404).json({ success: false, message: `Product #${req.params.number} not found` });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Search products autocomplete / instant
// @route GET /api/products/search/instant
exports.searchInstant = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      return res.json({ success: true, products: [] });
    }

    const regex = new RegExp(q.trim(), 'i');
    const isNum = !isNaN(Number(q.trim()));

    const query = {
      isActive: true,
      $or: [
        { name: regex },
        { category: regex }
      ]
    };

    if (isNum) {
      query.$or.push({ productNumber: Number(q.trim()) });
    }

    const products = await Product.find(query).limit(10).select('productNumber name category offerPrice originalPrice priceDisplay isCall isNetNet images');
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
