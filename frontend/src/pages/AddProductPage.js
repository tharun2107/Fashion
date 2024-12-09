
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

    const token = localStorage.getItem('token'); // Retrieve token

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user')); // Get user data
        const token = user?.token; // Extract token
    
        if (!token) {
            alert('User not authenticated.');
            return;
        }
    
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token in the request header
                },
            };
    
            await axios.post('http://localhost:5000/api/products', formData, config);
            alert('Product added successfully');
            setFormData({
                name: '',
                description: '',
                price: '',
                image: '',
                category: '',
                countInStock: '',
            });
            fetchProducts(); // Refresh product list
        } catch (error) {
            console.error('Failed to add product:', error.response?.data?.message || error.message);
            alert('Failed to add product');
        }
    };
    
    const fetchProducts = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get('http://localhost:5000/api/products', config);
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    // };
    const handleRemove = async (productId) => {
        try {
            const user = JSON.parse(localStorage.getItem('user')); // Ensure token retrieval
            const token = user?.token;
    
            if (!token) {
                alert('User not authenticated.');
                return;
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Properly format the token
                },
            };
    
            await axios.delete(`http://localhost:5000/api/products/${productId}`, config);
            alert('Product removed successfully');
            fetchProducts(); // Refresh product list
        } catch (error) {
            console.error('Failed to remove product:', error.response?.data?.message || error.message);
            alert('Failed to remove product');
        }
    };
    
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="add-product-container max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Product Management</h1>
            
            {/* Product Add Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="countInStock"
                    placeholder="Count In Stock"
                    value={formData.countInStock}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Product
                </button>
            </form>

            {/* Product List */}
            <div className="product-list mt-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Products</h2>
                <ul className="space-y-4">
                    {products.map((product) => (
                        <li key={product._id} className="flex justify-between items-center p-4 border-b border-gray-300">
                            <div>
                                <div><img src={product.image} width={100} />    </div>
                                <strong className="text-gray-800">{product.name}</strong> - ₹{product.price}
                                <p className="text-sm text-gray-600">{product.description}</p>
                            </div>
                            <button
                                onClick={() => handleRemove(product._id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddProductPage;
