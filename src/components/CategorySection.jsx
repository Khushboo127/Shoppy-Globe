// Category section component - displays products by category
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ProductItem from './ProductItem'
import { useProducts } from '../hooks/useProducts'
import '../styles/category-section.css'

export default function CategorySection({ category }) {
    const { products } = useProducts()
    const searchTerm = useSelector(state => state.search.searchTerm)
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        let filtered = products.filter(p => p.category === category)

        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        setFilteredProducts(filtered)
    }, [products, category, searchTerm])

    if (filteredProducts.length === 0) {
        return (
            <div className="no-products">
                No products found in this category. Try adjusting your search.
            </div>
        )
    }

    return (
        <div className="category-section">
            <div className="products-grid">
                {filteredProducts.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
