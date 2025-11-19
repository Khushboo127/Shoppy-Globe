// ProductList component - displays all products
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductItem from './ProductItem'
import { useProducts } from '../hooks/useProducts'
import '../styles/product-list.css'

export default function ProductList() {
    const { products, loading, error } = useProducts()
    const searchTerm = useSelector(state => state.search.searchTerm)
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredProducts(filtered)
        }
    }, [products, searchTerm])

    if (loading) return <div className="loading">Loading products...</div>
    if (error) return <div className="error">Error: {error}</div>
    if (filteredProducts.length === 0) return <div className="no-products">No products found</div>

    return (
        <div className="product-list">
            {filteredProducts.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}
