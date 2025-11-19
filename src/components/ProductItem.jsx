import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import '../styles/product-item.css'

export default function ProductItem({ product }) {
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.thumbnail,
            quantity: 1
        }))
    }

    return (
        <div className="product-item">
            <Link to={`/product/${product.id}`} className="product-link">
                <img
                    src={product.thumbnail || "/placeholder.svg"}
                    alt={product.title}
                    className="product-image"
                    loading="lazy"
                />
            </Link>
            <div className="product-info">
                <h3 className="product-title">
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                </h3>
                <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
