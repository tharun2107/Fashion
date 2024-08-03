// context/CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
    cartItems: []
};

// Reducer
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== action.payload)
            };
        default:
            return state;
    }
};

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    return (
        <CartContext.Provider value={{ cart: state.cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the Cart context
export const useCartContext = () => {
    return useContext(CartContext);
};
