import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a product name"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Please provide a product description"],
        },
        price: {
            type: Number,
            required: [true, "Please provide a product price"],
            min: [0, "Price cannot be negative"],
        },
        stockQuantity: {
            type: Number,
            required: [true, "Please provide stock quantity"],
            min: [0, "Stock quantity cannot be negative"],
            default: 0,
        },
        category: {
            type: String,
            required: true,
            enum: ["makeup",
                "clothes",
                "shoes",
                "electronics",
                "home_decor",
                "grocery",
                "jewellery",],
        },
        image: {
            type: String,
            default: "https://via.placeholder.com/300",
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
)

export default mongoose.model("Product", productSchema)
