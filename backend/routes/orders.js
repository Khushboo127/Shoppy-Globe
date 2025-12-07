// backend/routes/orders.js
import express from "express";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// POST /api/orders
// Creates an order using the current user's cart
router.post("/", verifyToken, async (req, res) => {
    try {
        const userId = req.userId;

        // 1) Load the user's cart with product details
        const cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart || !cart.items || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty. Cannot place order.",
            });
        }

        const shippingDetails = req.body.shippingDetails || {};

        // 2) Map cart items → order items
        // ❗ IMPORTANT: NEVER use `.id` on productId – only `_id` or the whole object
        const orderItems = cart.items.map((item) => ({
            // your Order schema might call this `product`, `productId`, etc.
            product: item.productId?._id || item.productId,
            quantity: item.quantity,
            price: item.price,
        }));

        // 3) Total price – use cart.totalPrice if you saved it, otherwise compute
        const totalPrice =
            typeof cart.totalPrice === "number"
                ? cart.totalPrice
                : cart.items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );

        // 4) Create order document
        const order = new Order({
            userId,
            items: orderItems,
            totalPrice,
            shippingDetails,
            status: "pending",
        });

        await order.save();

        // 5) Optional: clear the cart in DB
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
        });
    } catch (err) {
        console.error("Order creation failed:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Failed to place order",
        });
    }
});

export default router;
