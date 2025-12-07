import express from "express"
import Product from "../models/Product.js"

const router = express.Router()

// GET /api/products - Fetch all products
router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products,
        })
    } catch (error) {
        next(error)
    }
})

// GET /api/products/:id - Fetch single product by ID
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params

        // Validate if ID is a valid MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID format",
            })
        }

        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product,
        })
    } catch (error) {
        next(error)
    }
})

export default router
