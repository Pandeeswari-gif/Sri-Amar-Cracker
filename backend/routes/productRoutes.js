const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductByNumber,
  searchInstant
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/search/instant', searchInstant);
router.get('/number/:number', getProductByNumber);
router.get('/:id', getProductById);

module.exports = router;
