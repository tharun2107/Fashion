import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { useWishlistContext } from '../context/WishlistContext';
import '../style/ProductPage.css';

function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { user } = useUserContext();
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

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
    

    const isInWishlist = wishlist && wishlist.length > 0 && wishlist.some(item => item._id === product._id);

    return (
        <div className="product-page">
            {product && (
                <>
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>₹{product.price}</p>
                    <p>Available Quantity: {product.countInStock}</p>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min="1"
                        max={product.countInStock} />
                    <button onClick={addToCart}>Add to Cart</button>
                    <button onClick={() => isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product._id)}>
                        {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>

                    <h2>Related Products</h2>
                    <div className="related-products">
                        {relatedProducts.map(related => (
                            <div key={related._id}>
                                <h3>{related.name}</h3>
                                <img src={related.image} alt={related.name} />
                                <p>Price: ₹{related.price}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductPage;
