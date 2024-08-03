const express = require('express');
const { getProducts, getProductById, createProduct ,deleteProduct,getRelatedProducts} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct); // Add the POST route
router.delete('/:id',deleteProduct)
router.get('/related/:id', getRelatedProducts);
module.exports = router;
