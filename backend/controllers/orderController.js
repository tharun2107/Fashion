const Order = require('../models/Order');

const createOrder = async (req, res) => {
    const { products, totalPrice } = req.body;
    const userId = req.user._id;

    console.log('Creating order for user:', userId);
    console.log('Products:', products);
    console.log('Total Price:', totalPrice);

    try {
        const newOrder = new Order({
            user: userId,
            products,
            totalPrice,
        });
        const savedOrder = await newOrder.save();
        console.log('Order created successfully:', savedOrder);
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};
const getOrders = async (req, res) => {
    const userId = req.user._id;

    try {
        const orders = await Order.find({ user: userId }).populate('products.productId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

module.exports ={
    getOrders,
    createOrder,
}