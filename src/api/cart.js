// src/api/cart.js
import api from "./client";

export const addToCartApi = (productId, quantity = 1) =>
    api.post("/cart", { productId, quantity });

// 👇 NEW – update quantity of a cart item
export const updateCartItemApi = (cartItemId, quantity) =>
    api.put(`/cart/${cartItemId}`, { quantity });

// 👇 NEW – remove a cart item
export const removeCartItemApi = (cartItemId) =>
    api.delete(`/cart/${cartItemId}`);

export const getCart = () => api.get("/cart");
