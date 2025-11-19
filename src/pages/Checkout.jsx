import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../redux/cartSlice'
import '../styles/checkout.css'

export default function Checkout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.items)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: ''
    })
    const [orderPlaced, setOrderPlaced] = useState(false)

    if (cartItems.length === 0 && !orderPlaced) {
        return (
            <div className="empty-checkout">
                <h2>Your cart is empty</h2>
                <button onClick={() => navigate('/')}>Continue Shopping</button>
            </div>
        )
    }

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handlePlaceOrder = (e) => {
        e.preventDefault()
        setOrderPlaced(true)
        dispatch(clearCart())

        // Redirect to home after 2 seconds
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }

    if (orderPlaced) {
        return (
            <div className="order-success">
                <div className="success-message">
                    <h2>Order Placed Successfully!</h2>
                    <p>Thank you for your purchase. Your order has been confirmed.</p>
                    <p>Redirecting to home page...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <div className="checkout-container">
                <form className="checkout-form" onSubmit={handlePlaceOrder}>
                    <div className="form-section">
                        <h3>Shipping Information</h3>
                        <div className="form-row">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Street Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="form-row">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="zipCode"
                                placeholder="Zip Code"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="summary-item">
                                    <span>{item.title} x {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-total">
                            <strong>Total: ₹{calculateTotal().toLocaleString('en-IN')}</strong>
                        </div>
                        <button type="submit" className="place-order-btn">
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
