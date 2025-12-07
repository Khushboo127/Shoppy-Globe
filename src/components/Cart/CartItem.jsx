import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
import {
    updateCartItemApi,
    removeCartItemApi,
} from "../../api/cart"; // 👈 NEW
import "../../styles/cart-item.css";

export default function CartItem({ item }) {
    const dispatch = useDispatch();

    const handleRemove = async () => {
        try {
            // 🔁 1) Update backend cart
            await removeCartItemApi(item.cartItemId || item.id);

            // 🔁 2) Update Redux cart
            dispatch(removeFromCart(item.id));
        } catch (err) {
            console.error("REMOVE CART ITEM ERROR:", err);
            alert(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Could not remove item. Please try again."
            );
        }
    };

    const handleQuantityChange = async (newQuantity) => {
        if (newQuantity < 1) return;

        try {
            // 🔁 1) Update backend quantity
            await updateCartItemApi(item.cartItemId || item.id, newQuantity);

            // 🔁 2) Update Redux quantity
            dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
        } catch (err) {
            console.error("UPDATE CART QUANTITY ERROR:", err);
            alert(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Could not update quantity. Please try again."
            );
        }
    };

    return (
        <div className="cart-item">
            <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="item-image"
                loading="lazy"
            />

            <div className="item-details">
                <h4>{item.title}</h4>
                <p className="item-price">
                    ₹{item.price.toLocaleString("en-IN")}
                </p>
            </div>

            <div className="item-quantity">
                <button
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    disabled={item.quantity <= 1}
                >
                    −
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.quantity + 1)}>
                    +
                </button>
            </div>

            <div className="item-total">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </div>

            <button className="remove-btn" onClick={handleRemove}>
                Remove
            </button>
        </div>
    );
}
