import { body, validationResult } from "express-validator"

export const validateRegister = [
    body("username").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    handleValidationErrors,
]

export const validateLogin = [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").exists().withMessage("Password is required"),
    handleValidationErrors,
]

export const validateAddToCart = [
    body("productId").notEmpty().withMessage("Product ID is required"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    handleValidationErrors,
]

export const validateUpdateCart = [
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    handleValidationErrors,
]

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array(),
        })
    }
    next()
}
