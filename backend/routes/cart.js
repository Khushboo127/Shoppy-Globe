import express from "express"
import Cart from "../models/Cart.js"
import Product from "../models/Product.js"
import { verifyToken } from "../middleware/auth.js"
import { validateAddToCart, validateUpdateCart } from "../middleware/validation.js"

const router = express.Router()

// POST /api/cart - Add product to cart (protected)
router.post("/", verifyToken, validateAddToCart, async (req, res, next) => {
    try {
        const { productId, quantity } = req.body
        const userId = req.userId

        // Validate product exists and check stock
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })
        }

        if (product.stockQuantity < quantity) {
            return res.status(400).json({
                success: false,
                message: `Insufficient stock. Available: ${product.stockQuantity}`,
            })
        }

        // Find or create cart for user
        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({ userId, items: [], totalPrice: 0 })
        }

        // Check if product already in cart
        const existingItem = cart.items.find((item) => item.productId.toString() === productId)
        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cart.items.push({
                productId,
                quantity,
                price: product.price,
            })
        }

        // Calculate total price
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
        await cart.save()

        res.status(201).json({
            success: true,
            message: "Product added to cart successfully",
            data: cart,
        })
    } catch (error) {
        next(error)
    }
})

// GET /api/cart - Get user's cart (protected)
router.get("/", verifyToken, async (req, res, next) => {
    try {
        const userId = req.userId
        const cart = await Cart.findOne({ userId }).populate("items.productId")

        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                data: { items: [], totalPrice: 0 },
            })
        }

        res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            data: cart,
        })
    } catch (error) {
        next(error)
    }
})

// PUT /api/cart/:id - Update product quantity in cart (protected)
router.put("/:id", verifyToken, validateUpdateCart, async (req, res, next) => {
    try {
        const { id } = req.params
        const { quantity } = req.body
        const userId = req.userId

        const cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            })
        }

        // Find the item in cart
        const cartItem = cart.items.find((item) => item.productId.toString() === id)
        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart",
            })
        }

        // Validate stock
        const product = await Product.findById(id)
        if (product.stockQuantity < quantity) {
            return res.status(400).json({
                success: false,
                message: `Insufficient stock. Available: ${product.stockQuantity}`,
            })
        }

        cartItem.quantity = quantity
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
        await cart.save()

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: cart,
        })
    } catch (error) {
        next(error)
    }
})

// DELETE /api/cart/:id - Remove product from cart (protected)
router.delete("/:id", verifyToken, async (req, res, next) => {
    try {
        const { id } = req.params
        const userId = req.userId

        const cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            })
        }

        // Remove item from cart
        cart.items = cart.items.filter((item) => item.productId.toString() !== id)
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
        await cart.save()

        res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            data: cart,
        })
    } catch (error) {
        next(error)
    }
})

export default router
