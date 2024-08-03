const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createProduct = async (req, res) => {
    const { name, description, price, image, category, countInStock } = req.body;
    try {
        // Validate all required fields
        if (!name || !description || !price || !image || !category || !countInStock) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        console.log('Product Data:', req.body); // Log incoming request data

        const product = new Product({
            name,
            description,
            price,
            image,
            category,
            countInStock,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        console.log('Delete request received for product ID:', req.params.id);
        const product = await Product.findById(req.params.id);

        if (product) {
            await Product.deleteOne({ _id: req.params.id });
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getRelatedProducts = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        const relatedProducts = await Product.find({
            category: product.category,
            _id: { $ne: product._id }
        }).limit(5);

        res.status(200).json(relatedProducts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch related products' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    getRelatedProducts,
};
