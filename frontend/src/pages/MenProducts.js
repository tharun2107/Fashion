// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '../style/MenProduct.css';

// function MenProducts() {
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [category, setCategory] = useState('all');
//     const [priceRange, setPriceRange] = useState('all');

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const { data } = await axios.get('http://localhost:5000/api/products');
//                 setProducts(data);
//                 setFilteredProducts(data);
//             } catch (error) {
//                 console.error('Failed to fetch products', error);
//             }
//         };
//         fetchProducts();
//     }, []);

//     useEffect(() => {
//         let filtered = products;

//         if (category !== 'all') {
//             filtered = filtered.filter(product => product.category === category);
//         }

//         if (priceRange !== 'all') {
//             filtered = filtered.filter(product => {
//                 switch (priceRange) {
//                     case 'below_500':
//                         return product.price < 500;
//                     case '500_1000':
//                         return product.price >= 500 && product.price <= 1000;
//                     case 'above_1000':
//                         return product.price > 1000;
//                     default:
//                         return true;
//                 }
//             });
//         }

//         setFilteredProducts(filtered);
//     }, [category, priceRange, products]);

//     return (
//         <div className="men-products">
//             <h1>Men's Products</h1>
//             <div className="filters">
//                 <div className="category-filter">
//                     <button onClick={() => setCategory('all')}>All</button>
//                     <button onClick={() => setCategory('mens_shirts')}>Men's Shirts</button>
//                     <button onClick={() => setCategory('mens_trousers')}>Men's Trousers</button>
//                     <button onClick={() => setCategory('mens_tshirts')}>Men's T-Shirts</button>
//                 </div>
//                 <div className="price-filter">
//                     <button onClick={() => setPriceRange('all')}>All Prices</button>
//                     <button onClick={() => setPriceRange('below_500')}>Below ₹500</button>
//                     <button onClick={() => setPriceRange('500_1000')}>₹500 - ₹1000</button>
//                     <button onClick={() => setPriceRange('above_1000')}>Above ₹1000</button>
//                 </div>
//             </div>
//             <div className="product-grid">
//                 {filteredProducts.map(product => (
//                     <div className="product-card" key={product._id}>
//                         <Link to={`/product/${product._id}`}>
//                             <img src={product.image} alt={product.name} />
//                         </Link>
//                         <h2>{product.name}</h2>
//                         <p>{product.description}</p>
//                         <p className="price">₹{product.price}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default MenProducts;
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
        <div className="p-6 md:p-10 max-w-screen-xl mx-auto bg-gray-100">
            <h1 className="mb-6 text-3xl md:text-4xl font-bold text-center text-gray-800">Men's Products</h1>
            <div className="flex flex-col md:flex-row justify-between mb-6 flex-wrap">
                <div className="flex flex-wrap mb-4 md:mb-0">
                    <button onClick={() => setCategory('all')} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition mx-1 my-1">
                        All
                    </button>
                    <button onClick={() => setCategory('mens_shirts')} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition mx-1 my-1">
                        Men's Shirts
                    </button>
                    <button onClick={() => setCategory('mens_trousers')} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition mx-1 my-1">
                        Men's Trousers
                    </button>
                    <button onClick={() => setCategory('mens_tshirts')} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition mx-1 my-1">
                        Men's T-Shirts
                    </button>
                </div>
                <div className="flex flex-wrap">
                    <button onClick={() => setPriceRange('all')} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition mx-1 my-1">
                        All Prices
                    </button>
                    <button onClick={() => setPriceRange('below_500')} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition mx-1 my-1">
                        Below ₹500
                    </button>
                    <button onClick={() => setPriceRange('500_1000')} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition mx-1 my-1">
                        ₹500 - ₹1000
                    </button>
                    <button onClick={() => setPriceRange('above_1000')} className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition mx-1 my-1">
                        Above ₹1000
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105" key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <img src={product.image} alt={product.name} className="w-full h-48 sm:h-64 object-cover" />
                        </Link>
                        <div className="p-4">
                            <h2 className="text-lg md:text-xl font-semibold text-gray-800">{product.name}</h2>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MenProducts;
