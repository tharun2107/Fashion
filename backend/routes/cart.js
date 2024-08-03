const express = require('express');
const { addToCart, getCart, removeFromCart, updateCartQuantity,clearCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, addToCart);
router.get('/', protect, getCart);
router.delete('/:id', protect, removeFromCart);
router.put('/', protect, updateCartQuantity);
router.delete('/', protect, clearCart);
module.exports = router;
