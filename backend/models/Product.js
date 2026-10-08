const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productNumber: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  categorySlug: {
    type: String,
    trim: true
  },
  originalPrice: {
    type: Number,
    default: null
  },
  offerPrice: {
    type: Number,
    default: null
  },
  isCall: {
    type: Boolean,
    default: false
  },
  isNetNet: {
    type: Boolean,
    default: false
  },
  priceDisplay: {
    type: String,
    default: ''
  },
  packType: {
    type: String,
    default: '1 Box'
  },
  packQuantity: {
    type: String,
    default: '1 Box'
  },
  description: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  stock: {
    type: Number,
    default: 100
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isCombo: {
    type: Boolean,
    default: false
  },
  comboItemsCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 4.8
  },
  numReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

productSchema.index({ name: 'text', category: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
