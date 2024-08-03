import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/MenProduct.css';

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
        <div className="men-products">
            <h1>Men's Products</h1>
            <div className="filters">
                <div className="category-filter">
                    <button onClick={() => setCategory('all')}>All</button>
                    <button onClick={() => setCategory('mens_shirts')}>Men's Shirts</button>
                    <button onClick={() => setCategory('mens_trousers')}>Men's Trousers</button>
                    <button onClick={() => setCategory('mens_tshirts')}>Men's T-Shirts</button>
                </div>
                <div className="price-filter">
                    <button onClick={() => setPriceRange('all')}>All Prices</button>
                    <button onClick={() => setPriceRange('below_500')}>Below ₹500</button>
                    <button onClick={() => setPriceRange('500_1000')}>₹500 - ₹1000</button>
                    <button onClick={() => setPriceRange('above_1000')}>Above ₹1000</button>
                </div>
            </div>
            <div className="product-grid">
                {filteredProducts.map(product => (
                    <div className="product-card" key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <img src={product.image} alt={product.name} />
                        </Link>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="price">₹{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MenProducts;
