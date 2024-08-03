// api.js
export const BASE_URL = 'http://localhost:5000/api';

export const PRODUCT_URL = id => `${BASE_URL}/products/${id}`;
export const RELATED_PRODUCTS_URL = id => `${BASE_URL}/products/related/${id}`;
export const CART_URL = `${BASE_URL}/cart`;
export const WISHLIST_URL = `${BASE_URL}/wishlist`;
