// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useUserContext } from '../context/UserContext';
// import { useWishlistContext } from '../context/WishlistContext';
// import '../style/ProductPage.css';

// function ProductPage() {
//     const { id } = useParams();
//     const [product, setProduct] = useState(null);
//     const [quantity, setQuantity] = useState(1);
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const { user } = useUserContext();
//     // const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
//                 setProduct(data);
//             } catch (error) {
//                 console.error('Failed to fetch product', error);
//             }
//         };

//         const fetchRelatedProducts = async () => {
//             try {
//                 const { data } = await axios.get(`http://localhost:5000/api/products/related/${id}`);
//                 setRelatedProducts(data);
//             } catch (error) {
//                 console.error('Failed to fetch related products', error);
//             }
//         };

//         fetchProduct();
//         fetchRelatedProducts();
//     }, [id]);

//     const addToCart = async () => {
//         try {
//             if (!user || !user.token) {
//                 console.error('User token not available');
//                 return;
//             }

//             if (quantity > product.countInStock) {
//                 alert(`Only ${product.countInStock} units of this product are available`);
//                 return;
//             }

//             await axios.post('http://localhost:5000/api/cart', { productId: product._id, quantity }, {
//                 headers: {
//                     Authorization: `Bearer ${user.token}`,
//                 },
//             });
//             alert('Product added to cart');
//         } catch (error) {
//             console.error('Failed to add product to cart', error);
//         }
//     };
    

//     // const isInWishlist = wishlist && wishlist.length > 0 && wishlist.some(item => item._id === product._id);

//     return (
//         <div className="product-page">
//             {product && (
//                 <>
//                     <img src={product.image} alt={product.name} />
//                     <h3>{product.name}</h3>
//                     <p>{product.description}</p>
//                     <p>₹{product.price}</p>
//                     <p>Available Quantity: {product.countInStock}</p>
//                     <input
//                         type="number"
//                         value={quantity}
//                         onChange={(e) => setQuantity(Number(e.target.value))}
//                         min="1"
//                         max={product.countInStock} />
//                     <button onClick={addToCart}>Add to Cart</button>
                
                 

//                     <h2>Related Products</h2>
//                     <div className="related-products">
//                         {relatedProducts.map(related => (
//                             <div key={related._id}>
//                                 <h3>{related.name}</h3>
//                                 <img src={related.image} alt={related.name} />
//                                 <p>Price: ₹{related.price}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default ProductPage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
// import { useWishlistContext } from '../context/WishlistContext'; // Uncomment if needed
import '../style/ProductPage.css';

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { user } = useUserContext();
    // const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext(); // Uncomment if needed

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product', error);
            }
        };

        const fetchRelatedProducts = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/related/${id}`);
                setRelatedProducts(data);
            } catch (error) {
                console.error('Failed to fetch related products', error);
            }
        };

        fetchProduct();
        fetchRelatedProducts();
    }, [id]);

    const addToCart = async () => {
        try {
            if (!user || !user.token) {
                console.error('User token not available');
                return;
            }

            if (quantity > product.countInStock) {
                alert(`Only ${product.countInStock} units of this product are available`);
                return;
            }

            await axios.post('http://localhost:5000/api/cart', { productId: product._id, quantity }, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            alert('Product added to cart');
        } catch (error) {
            console.error('Failed to add product to cart', error);
        }
    };

    // const isInWishlist = wishlist && wishlist.length > 0 && wishlist.some(item => item._id === product._id); // Uncomment if needed

    return (
        <div className="container mx-auto p-6">
            {product && (
                <div className="flex flex-col lg:flex-row items-start bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full lg:w-1/2 h-96 object-cover" />
                    <div className="p-6 lg:w-1/2 flex flex-col justify-between">
                        <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                        <p className="text-xl font-semibold text-gray-800 mt-4">₹{product.price}</p>
                        <p className="text-gray-600 mt-2">Available Quantity: {product.countInStock}</p>
                        <div className="mt-4 flex items-center">
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                min="1"
                                max={product.countInStock}
                                className="border border-gray-300 rounded-md p-2 w-16"
                            />
                            <button onClick={addToCart} className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-bold text-gray-800 mt-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {relatedProducts.map(related => (
                    <div key={related._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                        <img src={related.image} alt={related.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{related.name}</h3>
                            <p className="text-blue-600 font-bold mt-2">₹{related.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductPage;
