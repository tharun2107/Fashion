import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/AddProduct.css';

const AddProductPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        countInStock: '',
    });

    const [products, setProducts] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/products', formData);
            alert('Product added successfully');
            setFormData({
                name: '',
                description: '',
                price: '',
                image: '',
                category: '',
                countInStock: '',
            });
            fetchProducts(); // Refresh the product list after adding a new product
        } catch (error) {
            console.error('Failed to add product:', error);
            alert('Failed to add product');
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const handleRemove = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${productId}`);
            alert('Product removed successfully');
            fetchProducts(); // Refresh the product list after removing a product
        } catch (error) {
            console.error('Failed to remove product:', error);
            alert('Failed to remove product');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="add-product-container">
            <h1>Product Management</h1>
            <div className="add-product-form">
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="countInStock"
                        placeholder="Count In Stock"
                        value={formData.countInStock}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Add Product</button>
                </form>
            </div>
            <div className="product-list">
                <h2>Available Products</h2>
                <ul>
                    {products.map(product => (
                        <li key={product._id} className="product-item">
                            <div>
                                <strong>{product.name}</strong> - ₹{product.price}
                            </div>
                            <div>{product.description}</div>
                            <div>Category: {product.category}</div>
                            <div>In Stock: {product.countInStock}</div>
                            <button onClick={() => handleRemove(product._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddProductPage;
