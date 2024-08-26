const express = require('express');
const router = express.Router();
const Product = require('../models/productSchema.js');
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/productController.js');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;