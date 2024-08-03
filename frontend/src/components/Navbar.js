import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import '../style/Navbar.css';
import ProfilePage from '../pages/ProfilePage'; // Importing ProfilePage component

function Navbar() {
    const { user, logout } = useUserContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">StyleSphere</Link>
            </div>
            <button className="navbar-toggle" onClick={toggleMenu}>
                &#9776;
            </button>
            <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                <li><Link to="/">Home</Link></li>
              
                <li><Link to="/mensfashion">Men</Link></li>
             
                {user ? (
                    <>
                        <li><button className="profile-button" onClick={toggleProfile}>Profile</button></li>
                        <li><button className="logout-button" onClick={logout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
                   <li><Link to="/wishlist">Wishlist</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/orders">Orders</Link></li>
            </ul>
            {isProfileOpen && <ProfilePage onClose={toggleProfile} />} {/* Render ProfilePage if isProfileOpen is true */}
        </nav>
    );
}

export default Navbar;
