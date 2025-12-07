// Header component with navigation and cart icon
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/header.css';

export default function Header() {
    const cartItems = useSelector(state => state.cart.items);
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="header">
            <div className="header-container">

                {/* LOGO */}
                <Link to="/" className="logo">
                    ShoppyGlobe
                </Link>

                {/* NAVIGATION */}
                <nav className="nav-menu">
                    <Link to="/">Home</Link>
                    <Link to="/cart" className="cart-link">
                        Cart
                        {cartItemCount > 0 && (
                            <span className="cart-badge">{cartItemCount}</span>
                        )}
                    </Link>

                    {/* SHOW LOGIN / LOGOUT CONDITIONALLY */}
                    {!token ? (
                        <Link to="/login">Login</Link>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            Logout
                        </button>
                    )}
                    <Link to="/register" className="nav-btn nav-btn--primary">
                        Register
                    </Link>


                </nav>
            </div>
        </header>
    );
}
