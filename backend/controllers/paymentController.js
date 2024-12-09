const Razorpay = require('razorpay');
const crypto = require('crypto');
const shortid = require('shortid');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
console.log('Razorpay Key ID:', process.env.RAZORPAY_KEY_ID);
console.log('Razorpay Key Secret:', process.env.RAZORPAY_KEY_SECRET);

// exports.createOrder = async (req, res) => {
//     const { amount, currency } = req.body;
//     const options = {
//         amount: amount * 100, // amount in the smallest currency unit
//         currency,
//         receipt: shortid.generate(),
//     };

//     try {
//         const response = await razorpay.orders.create(options);
//         res.json(response);
//     } catch (error) {
//         console.error('Error creating Razorpay order:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
exports.createOrder = async (req, res) => {
    const { amount, currency } = req.body;
    const options = {
        amount: amount * 100, // amount in the smallest currency unit (e.g., paise for INR)
        currency,
        receipt: shortid.generate(),
    };

    try {
        const response = await razorpay.orders.create(options);

        // Log the response to check its structure
        console.log('Razorpay Order Response:', response); // Ensure this contains `status` and `id`

        if (response && response.status === 'created') {
            res.json(response);  // Send the response back to the client
        } else {
            throw new Error('Razorpay order creation failed. Response status is not "created".');
        }
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
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
