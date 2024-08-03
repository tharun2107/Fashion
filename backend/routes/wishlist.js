const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/WishlistController');


const router = express.Router();

router.get('/', protect, getWishlist);
router.post('/', protect, addToWishlist);
router.delete('/', protect, removeFromWishlist);

module.exports = router;
