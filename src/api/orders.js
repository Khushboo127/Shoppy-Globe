// src/api/orders.js
import api from "./client";

// Creates an order using the current user's cart on the backend
export const placeOrderApi = async (shippingDetails) => {
    const res = await api.post("/orders", { shippingDetails });
    return res.data; // { success, message, order }
};
