import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import AddProductPage from './pages/AddProductPage';
import PaymentPage from './pages/PaymentPage';
import OrdersPage from './pages/OrdersPage';
import MenProducts from './pages/MenProducts';
import WishlistPage from './pages/WishlistPage';

function App() {
  return (
    <div className="App">

      <Navbar />
      <Routes>
      <Route path="/addproduct" element={<AddProductPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/mensfashion" element={<MenProducts />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </div>
  );
}

export default App;
