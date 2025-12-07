import mongoose from "mongoose"

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, "Quantity must be at least 1"],
                },
                price: {
                    type: Number,
                    required: true,
                },
                addedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        totalPrice: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
)

export default mongoose.model("Cart", cartSchema)
