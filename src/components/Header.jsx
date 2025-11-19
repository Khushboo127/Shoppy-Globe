// Header component with navigation and cart icon
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../styles/header.css'

export default function Header() {
    const cartItems = useSelector(state => state.cart.items)
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    ShoppyGlobe
                </Link>

                <nav className="nav-menu">
                    <Link to="/">Home</Link>
                    <Link to="/cart" className="cart-link">
                        Cart
                        {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                    </Link>
                </nav>
            </div>
        </header>
    )
}
