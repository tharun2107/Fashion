const express = require('express');
const { getProducts, getProductById, createProduct ,deleteProduct,getRelatedProducts} = require('../controllers/productController');
const { protect, adminMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, adminMiddleware,createProduct); // Add the POST route
router.delete('/:id',protect, adminMiddleware,deleteProduct)
router.get('/related/:id', getRelatedProducts);
module.exports = router;
