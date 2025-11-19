import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import { dummyProducts } from '../data/dummyProducts'
import '../styles/product-detail.css'

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            setLoading(true)
            const foundProduct = dummyProducts.find(p => p.id === parseInt(id))
            if (!foundProduct) throw new Error('Product not found')
            setProduct(foundProduct)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [id])

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.thumbnail,
                quantity: 1
            }))
            alert('Product added to cart!')
        }
    }

    if (loading) return <div className="loading">Loading product...</div>
    if (error) return <div className="error">Error: {error}</div>
    if (!product) return <div className="error">Product not found</div>

    return (
        <div className="product-detail">
            <Link to="/" className="back-link">← Back to Products</Link>
            <div className="detail-container">
                <div className="detail-image">
                    <img src={product.thumbnail || "/placeholder.svg"} alt={product.title} loading="lazy" />
                </div>
                <div className="detail-info">
                    <h1>{product.title}</h1>
                    <p className="category">Category: {product.category}</p>
                    <p className="description">{product.description}</p>
                    <div className="rating">
                        <span className="stars">★ {product.rating}</span>
                        <span className="reviews">Reviews: {product.reviews}</span>
                    </div>
                    <div className="price-section">
                        <p className="price">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
