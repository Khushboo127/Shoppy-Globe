import React, { useState, lazy, Suspense } from 'react'
import { useProducts } from '../hooks/useProducts'
import SearchBar from '../components/SearchBar'
import CategorySection from '../components/CategorySection'
import '../styles/home.css'

const ProductList = lazy(() => import('../components/ProductList'))

export default function Home() {
    const { products, loading, error } = useProducts()
    const [selectedCategory, setSelectedCategory] = useState(null)

    // Get unique categories from products
    const categories = [...new Set(products.map(p => p.category))]

    // Category configuration with icons and colors
    const categoryConfig = {
        makeup: {
            label: "Beauty & Makeup",
            color: "#262650ff",
            icon: "💄"
        },

        clothes: {
            label: "Clothes & Fashion",
            color: "#262650ff",
            icon: "👗"
        },

        shoes: {
            label: "Footwear",
            color: "#262650ff",
            icon: "👟"
        },

        electronics: {
            label: "Electronics",
            color: "#262650ff",
            icon: "📱"
        },

        home_decor: {
            label: "Home Decor",
            color: "#262650ff",
            icon: "🏠"
        },

        grocery: {
            label: "Groceries",
            color: "#262650ff",
            icon: "🛒"
        },

        jewellery: {
            label: "Jewellery",
            color: "#262650ff",
            icon: "💍"
        }
    }

    if (error) return <div className="error">Error: {error}</div>

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to ShoppyGlobe</h1>
                    <p>Discover amazing products from around the world</p>
                </div>
            </section>

            {/* Search Bar */}
            <div className="search-container">
                <SearchBar />
            </div>

            {/* Categories Grid */}
            {selectedCategory === null && (
                <section className="categories-showcase">
                    <h2>Shop by Category</h2>
                    <div className="categories-grid">
                        {categories.map(category => {
                            const config = categoryConfig[category] || { label: category, color: '#666', icon: '📦' }
                            const categoryProducts = products.filter(p => p.category === category)
                            return (
                                <div
                                    key={category}
                                    className="category-card"
                                    onClick={() => setSelectedCategory(category)}
                                    style={{ '--accent-color': config.color }}
                                >
                                    <div className="category-icon">{config.icon}</div>
                                    <h3>{config.label}</h3>
                                    <p>{categoryProducts.length} items</p>
                                    <button className="view-btn">View Products</button>
                                </div>
                            )
                        })}
                    </div>
                </section>
            )}

            {/* Category Products View */}
            {selectedCategory && (
                <section className="category-view">
                    <button className="back-btn" onClick={() => setSelectedCategory(null)}>
                        ← Back to Categories
                    </button>
                    <h2>{categoryConfig[selectedCategory]?.label || selectedCategory}</h2>
                    <Suspense fallback={<div className="loading">Loading products...</div>}>
                        <CategorySection category={selectedCategory} />
                    </Suspense>
                </section>
            )}

            {/* All Products View */}
            {selectedCategory === null && (
                <section className="all-products-section">
                    <h2>Browse All Products</h2>
                    <Suspense fallback={<div className="loading">Loading products...</div>}>
                        <ProductList />
                    </Suspense>
                </section>
            )}
        </div>
    )
}
