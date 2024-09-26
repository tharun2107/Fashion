 import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import ProfilePage from '../pages/ProfilePage';
import '../style/Navbar.css'; // Importing the external CSS file

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
            <button 
                className="navbar-toggle" 
                onClick={toggleMenu}
            >
                &#9776; {/* Hamburger icon */}
            </button>
            <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/mensfashion">Men</Link></li>
                {/* <li><Link to="/wishlist">Wishlist</Link></li> */}
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/orders">Orders</Link></li>

                {user ? (
                    <>
                        <li>
                            <button className="profile-button" onClick={toggleProfile}>Profile</button>
                        </li>
                        <li>
                            <button className="logout-button" onClick={logout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
            {isProfileOpen && <ProfilePage onClose={toggleProfile} />}
        </nav>
    );
}

export default Navbar;
