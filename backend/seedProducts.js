// backend/seedProducts.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import { dummyProducts } from "./seed/dummyProducts.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function runSeed() {
    try {
        console.log("🔌 Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected!");

        console.log("🧹 Clearing existing products...");
        await Product.deleteMany({});

        console.log("📥 Inserting dummy products...");

        const docs = dummyProducts.map((p) => ({
            // map frontend fields → backend schema fields
            name: p.title,                // Product name
            description: p.description,
            price: p.price,
            category: p.category,
            image: p.thumbnail,           // store thumbnail as image
            rating: p.rating ?? 0,
            stockQuantity: 50,            // give all items stock
            stock: 50,                    // if your schema has stock
            reviewsCount: p.reviews ?? 0, // optional, only if schema has it
        }));

        await Product.insertMany(docs);

        console.log(`🎉 Inserted ${docs.length} products into MongoDB`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Seeding error:", err);
        process.exit(1);
    }
}

runSeed();
