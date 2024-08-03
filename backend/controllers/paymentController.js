const Razorpay = require('razorpay');
const crypto = require('crypto');
const shortid = require('shortid');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    const { amount, currency } = req.body;
    const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency,
        receipt: shortid.generate(),
    };

    try {
        const response = await razorpay.orders.create(options);
        res.json(response);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.verifyPayment = (req, res) => {
    const { orderId, paymentId, signature } = req.body;

    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    const isAuthentic = expectedSignature === signature;

    if (isAuthentic) {
        res.send({ message: 'Payment verified successfully' });
    } else {
        res.status(400).send({ message: 'Payment verification failed' });
    }
};
