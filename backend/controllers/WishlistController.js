const Wishlist = require('../models/Wishlist');

// Get user's wishlist
exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
};

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
console.log(productId);
    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id });

        if (!wishlist) {
            wishlist = new Wishlist({ user: req.user._id, products: [productId] });
        } else {
            wishlist.products.push(productId);
        }

        await wishlist.save();
        res.status(201).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product to wishlist' });
    }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
    const { productId } = req.body;

    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id });

        if (wishlist) {
            wishlist.products = wishlist.products.filter(product => product.toString() !== productId);
            await wishlist.save();
        }

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove product from wishlist' });
    }
};
