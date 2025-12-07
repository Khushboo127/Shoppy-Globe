// src/hooks/useProducts.js
import { useEffect, useState } from "react";
import api from "../api/client"; // axios instance we created earlier

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                // backend: GET /api/products → { success, message, data: [...] }
                const res = await api.get("/products");
                const backendProducts = res.data.data || [];

                // Normalize to what your components expect
                const normalized = backendProducts.map((p) => ({
                    id: p._id,                  // for React key & ProductItem
                    title: p.name,              // used in ProductList filter
                    price: p.price,
                    thumbnail: p.image,
                    category: p.category,
                    description: p.description,
                    rating: p.rating ?? 0,
                    stockQuantity: p.stockQuantity ?? p.stock ?? 0,
                }));

                setProducts(normalized);
            } catch (err) {
                console.error("Error loading products:", err);
                setError(
                    err.response?.data?.message || "Failed to load products from server"
                );
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return { products, loading, error };
};
