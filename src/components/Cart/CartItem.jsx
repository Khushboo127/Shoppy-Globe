import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../../redux/cartSlice'
import '../../styles/cart-item.css'

export default function CartItem({ item }) {
    const dispatch = useDispatch()

    const handleRemove = () => {
        dispatch(removeFromCart(item.id))
    }

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
        }
    }

    return (
        <div className="cart-item">
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="item-image" loading="lazy" />
            <div className="item-details">
                <h4>{item.title}</h4>
                <p className="item-price">₹{item.price.toLocaleString('en-IN')}</p>
            </div>
            <div className="item-quantity">
                <button onClick={() => handleQuantityChange(item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.quantity + 1)}>+</button>
            </div>
            <div className="item-total">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
            </div>
            <button className="remove-btn" onClick={handleRemove}>Remove</button>
        </div>
    )
}
