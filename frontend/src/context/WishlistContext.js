// context/WishlistContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from './UserContext';

// Initial state
const initialState = {
    wishlistItems: [],
};

// Reducer
const wishlistReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_WISHLIST_SUCCESS':
            return {
                ...state,
                wishlistItems: action.payload,
            };
        case 'ADD_TO_WISHLIST':
            return {
                ...state,
                wishlistItems: [...state.wishlistItems, action.payload],
            };
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter(item => item._id !== action.payload),
            };
        default:
            return state;
    }
};

// Create context
const WishlistContext = createContext();

// Provider component
export const WishlistProvider = ({ children }) => {
    const { user } = useUserContext();
    const [state, dispatch] = useReducer(wishlistReducer, initialState);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                if (user && user.token) {
                    const { data } = await axios.get('http://localhost:5000/api/wishlist', {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    });
                    dispatch({ type: 'FETCH_WISHLIST_SUCCESS', payload: data });
                }
            } catch (error) {
                console.error('Failed to fetch wishlist', error);
                // Optionally handle error state
            }
        };

        fetchWishlist();
    }, [user,dispatch]);

    const addToWishlist = async (productId) => {
        try {
            if (!user || !user.token) {
                console.error('User token not available');
                return;
            }

            const { data } = await axios.post(
                'http://localhost:5000/api/wishlist',
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            dispatch({ type: 'ADD_TO_WISHLIST', payload: data });
            alert('Product added to wishlist');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Please log in to add to wishlist');
                // Handle unauthorized actions, e.g., redirect to login page or display a message
            } else {
                console.error('Failed to add to wishlist', error);
            }
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            if (!user || !user.token) {
                console.error('User token not available');
                return;
            }

            await axios.delete(`http://localhost:5000/api/wishlist/${productId}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
            alert('Product removed from wishlist');
        } catch (error) {
            console.error('Failed to remove from wishlist', error);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist: state.wishlistItems, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hook to use the Wishlist context
export const useWishlistContext = () => {
    return useContext(WishlistContext);
};
