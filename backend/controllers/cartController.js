const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');

        if (cart) {
            // Filter out products with invalid data
            const validProducts = cart.products.filter(product => product.productId);

            // Update the cart with only valid products
            cart.products = validProducts;

            // Save the cart with valid products
            await cart.save();

            res.json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const addToCart = async (req, res) => {
    const userId = req.user._id; // Make sure this is correct and available
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ userId });

        if (cart) {
            // Check if the product already exists in the cart
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

            if (productIndex > -1) {
                // If product exists, update the quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // If product does not exist, add it to the cart
                cart.products.push({ productId, quantity });
            }

            cart = await cart.save();
            res.status(200).json(cart);
        } else {
            // If no cart exists, create a new one
            const newCart = await Cart.create({
                userId,
                products: [{ productId, quantity }],
            });
            res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const removeFromCart = async (req, res) => {
    const { id } = req.params;

    try {
        let cart = await Cart.findOne({ userId: req.user._id });

        if (cart) {
            cart.products = cart.products.filter(p => p.productId.toString() !== id);

            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateCartQuantity = async (req, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

            if (productIndex > -1) {
                // Update the quantity
                cart.products[productIndex].quantity = quantity;

                cart = await cart.save();
                res.status(200).json(cart);
            } else {
                res.status(404).json({ message: 'Product not found in cart' });
            }
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const clearCart = async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        console.error('No user ID found in request');
        return res.status(400).json({ error: 'User ID is required' });
    }

    console.log(`Clearing cart for user: ${userId}`);

    try {
        // Find the cart for the user and update the products array
        const result = await Cart.findOneAndUpdate(
            { userId: userId }, // Ensure correct field name
            { $set: { products: [] } }, // Ensure the update operation is correct
            { new: true, useFindAndModify: false } // Return the updated document and disable deprecated useFindAndModify
        );

        if (!result) {
            console.warn(`No cart found for user: ${userId}`);
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Additional logging to check the state of the result
        console.log('Update result:', result);

        console.log('Cart cleared successfully');
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ error: 'Failed to clear cart' });
    }
};



module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
};
