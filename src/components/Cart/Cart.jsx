import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import '../../styles/cart.css'

export default function CartComponent() {
    const cartItems = useSelector(state => state.cart.items)

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Start shopping to add items to your cart</p>
                <Link to="/" className="continue-shopping-btn">
                    Continue Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            <div className="cart-content">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Subtotal:</span>
                        <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total:</span>
                        <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
                    </div>
                    <Link to="/checkout" className="checkout-btn">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    )
}
