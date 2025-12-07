// src/components/cart/Cart.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useCart } from "../../hooks/useCart";
import { useDispatch, useSelector } from "react-redux";
import { setCartFromBackend } from "../../redux/cartSlice";

import "../../styles/cart.css";

export default function CartComponent() {
    // Loads cart from backend (used only to INITIALIZE Redux)
    const { cart, loading, error } = useCart();

    // Redux
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);   // 👈 render from this

    // When backend cart loads, sync it into Redux + localStorage
    useEffect(() => {
        if (cart && cart.items) {
            const mapped = cart.items.map((item) => ({
                id:
                    item.productId?._id ||
                    item.productId?.id ||
                    item.productId ||
                    item._id,
                title:
                    item.productId?.name ||
                    item.productId?.title ||
                    "Product",
                price: item.price,
                image: item.productId?.image || item.productId?.thumbnail,
                quantity: item.quantity,
            }));

            dispatch(setCartFromBackend(mapped));
        }
    }, [cart, dispatch]);

    // If we're still loading AND Redux has nothing yet
    if (loading && items.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Loading your cart...</h2>
            </div>
        );
    }

    // If there was an error loading the cart initially
    if (error && items.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Something went wrong</h2>
                <p>{error}</p>
                <Link to="/" className="continue-shopping-btn">
                    Back to Home
                </Link>
            </div>
        );
    }

    // If Redux cart is empty → show empty cart
    if (!items || items.length === 0) {
        return (
            <div className="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Start shopping to add items to your cart</p>
                <Link to="/" className="continue-shopping-btn">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    // Calculate total from Redux items
    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>

            <div className="cart-content">
                <div className="cart-items">
                    {items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>

                    <div className="summary-row">
                        <span>Subtotal:</span>
                        <span>₹{total.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="summary-row">
                        <span>Shipping:</span>
                        <span>Free</span>
                    </div>

                    <div className="summary-row total">
                        <span>Total:</span>
                        <span>₹{total.toLocaleString("en-IN")}</span>
                    </div>

                    <Link to="/checkout" className="checkout-btn">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
}
