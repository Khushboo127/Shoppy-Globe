import api from "./client";

// GET /api/products
export const fetchProducts = () => api.get("/products");

// GET /api/products/:id
export const fetchProductById = (id) => api.get(`/products/${id}`);
