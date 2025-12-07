// src/components/ProductItem.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToCartApi } from "../api/cart";
import "../styles/product-item.css";

export default function ProductItem({ product }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        setLoading(true);

        try {
            // 1️⃣ Call backend API to sync cart
            await addToCartApi(product.id, 1); // product.id is normalized from _id

            // 2️⃣ Update Redux cart so UI reacts instantly
            dispatch(
                addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.thumbnail,
                    quantity: 1,
                })
            );
        } catch (err) {
            console.error("ADD TO CART ERROR:", err);

            if (err.response?.status === 401) {
                alert("Please login to add items to cart.");
            } else {
                alert(
                    err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Failed to add to cart."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-item">
            <Link to={`/product/${product.id}`} className="product-link">
                <img
                    src={product.thumbnail || "/placeholder.svg"}
                    alt={product.title}
                    className="product-image"
                    loading="lazy"
                />
            </Link>

            <div className="product-info">
                <h3 className="product-title">
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                </h3>

                <p className="product-price">
                    ₹{product.price.toLocaleString("en-IN")}
                </p>

                <button
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add to Cart"}
                </button>
            </div>
        </div>
    );
}
