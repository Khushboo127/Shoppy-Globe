import { useEffect, useState } from "react";
import { getCart } from "../api/cart";

export const useCart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const res = await getCart();
                const serverCart = res.data.data || res.data.cart || null;
                setCart(serverCart);
            } catch (err) {
                console.error("Error loading cart:", err);
                setError(
                    err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Failed to load cart."
                );
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, []);

    return { cart, loading, error };
};
