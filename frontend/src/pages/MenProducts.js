import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MenProducts() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState('all');
    const [priceRange, setPriceRange] = useState('all');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = products;

        if (category !== 'all') {
            filtered = filtered.filter(product => product.category === category);
        }

        if (priceRange !== 'all') {
            filtered = filtered.filter(product => {
                switch (priceRange) {
                    case 'below_500':
                        return product.price < 500;
                    case '500_1000':
                        return product.price >= 500 && product.price <= 1000;
                    case 'above_1000':
                        return product.price > 1000;
                    default:
                        return true;
                }
            });
        }

        setFilteredProducts(filtered);
    }, [category, priceRange, products]);

    return (
        <div className="bg-gray-100 py-10 px-6 md:px-10 mt-12">
            <h1 className="mb-8 text-4xl md:text-5xl font-bold text-center text-gray-800">Shop the Best Men's Products</h1>
            <div className="flex flex-col md:flex-row justify-between mb-8 items-center">
                <div className="flex flex-wrap mb-4 md:mb-0">
                    {['all', 'mens_shirts', 'mens_trousers', 'mens_tshirts'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`bg-gray-800 text-white py-2 px-6 rounded-full hover:bg-gray-700 transition mx-2 my-1 ${category === cat ? 'bg-teal-600' : ''}`}
                        >
                            {cat === 'all' ? 'All Categories' : `Men's ${cat.split('_')[1].charAt(0).toUpperCase() + cat.split('_')[1].slice(1)}`}
                        </button>
                    ))}
                </div>
                <div className="flex flex-wrap items-center">
                    {['all', 'below_500', '500_1000', 'above_1000'].map(range => (
                        <button
                            key={range}
                            onClick={() => setPriceRange(range)}
                            className={`bg-gray-800 text-white py-2 px-6 rounded-full hover:bg-gray-700 transition mx-2 my-1 ${priceRange === range ? 'bg-teal-600' : ''}`}
                        >
                            {range === 'all' ? 'All Prices' : range === 'below_500' ? 'Below ₹500' : range === 'above_1000' ? 'Above ₹1000' : '₹500 - ₹1000'}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                    <div className="product-card bg-white rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl" key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <div className="relative">
                                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-t-xl" />
                                <div className="absolute top-0 left-0 bg-gradient-to-t from-black to-transparent p-2 rounded-t-xl">
                                    <span className="text-white font-semibold">{product.discount}</span>
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <h2 className="text-2xl text-gray-800 font-semibold mb-3">{product.name}</h2>
                                <p className="text-gray-600 mb-3">{product.description}</p>
                                <p className ="text-2xl font-bold text-teal-700">₹{product.price}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MenProducts;