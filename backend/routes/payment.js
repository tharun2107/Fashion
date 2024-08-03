const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/orders', protect, createOrder); // Ensure createOrder is defined and imported
router.post('/verify', protect, verifyPayment); // Ensure verifyPayment is defined and imported

module.exports = router;
