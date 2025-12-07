// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useCart } from "../hooks/useCart";
import { placeOrderApi } from "../api/orders";
import "../styles/checkout.css";

export default function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, loading, error: cartError } = useCart();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zipCode: "",
    });

    const [orderPlaced, setOrderPlaced] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    // While backend cart is loading
    if (loading) {
        return (
            <div className="empty-checkout">
                <h2>Loading your cart...</h2>
            </div>
        );
    }

    // If loading failed or token invalid
    if (cartError) {
        return (
            <div className="empty-checkout">
                <h2>Something went wrong</h2>
                <p>{cartError}</p>
                <button onClick={() => navigate("/login")}>Go to Login</button>
            </div>
        );
    }

    // No cart or empty cart
    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="empty-checkout">
                <h2>Your cart is empty</h2>
                <button onClick={() => navigate("/")}>Continue Shopping</button>
            </div>
        );
    }

    // Map backend item → what we display
    const mapBackendItem = (item) => ({
        id:
            item.productId?._id ||
            item.productId?.id || // safe because of ?.
            item.productId ||
            item._id,
        title: item.productId?.name || item.productId?.title || "Product",
        price: item.price,
        quantity: item.quantity,
    });

    const summaryItems = cart.items.map(mapBackendItem);

    const calculateTotal = () => {
        if (typeof cart.totalPrice === "number") return cart.totalPrice;
        return summaryItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    const total = calculateTotal();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            // ✅ Only send shipping details – backend will read cart by userId
            await placeOrderApi({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                zipCode: formData.zipCode,
            });

            setOrderPlaced(true);
            dispatch(clearCart()); // clear Redux badge/local cart

            setTimeout(() => {
                navigate("/");
            }, 5000);
        } catch (err) {
            console.error("Place order error:", err);
            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to place order. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (orderPlaced) {
        return (
            <div className="order-success">
                <div className="success-message">
                    <h2>Order Placed Successfully!</h2>
                    <p>Thank you for your purchase. Your order has been confirmed.</p>
                    <p>Redirecting to home page...</p>
                </div>
            </div>
        );
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
                            {summaryItems.map((item) => (
                                <div key={item.id} className="summary-item">
                                    <span>
                                        {item.title} x {item.quantity}
                                    </span>
                                    <span>
                                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-total">
                            <strong>Total: ₹{total.toLocaleString("en-IN")}</strong>
                        </div>
                        <button type="submit" className="place-order-btn" disabled={submitting}>
                            {submitting ? "Placing order..." : "Place Order"}
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}
