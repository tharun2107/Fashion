import React, { useEffect } from 'react';
import { useWishlistContext } from '../context/WishlistContext';
import { useUserContext } from '../context/UserContext';
import '../style/Wishlist.css';

function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlistContext();
    const { user } = useUserContext();

    useEffect(() => {
        if (!user) {
            // Redirect to login if not logged in
            window.location.href = '/login';
        }
    }, [user]);

    if (wishlist === null || wishlist === undefined) {
        return <p>Loading...</p>; // Handle initial loading state
    }

    if (!Array.isArray(wishlist)) {
        console.error('Wishlist is not an array:', wishlist);
        return <p>Error: Failed to fetch wishlist</p>; // Handle unexpected data type
    }

    return (
        <div className="wishlist-page">
            <h2>My Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="wishlist-products">
                    {wishlist && wishlist >0 && wishlist.map(product => (
                        <div key={product._id} className="wishlist-product">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>₹{product.price}</p>
                            <button onClick={() => removeFromWishlist(product._id)}>Remove</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WishlistPage;
