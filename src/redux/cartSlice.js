// Cart reducer and actions
const initialState = {
    items: JSON.parse(localStorage.getItem('cartItems') || '[]')
}

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const CLEAR_CART = 'CLEAR_CART'

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product
})

export const removeFromCart = (id) => ({
    type: REMOVE_FROM_CART,
    payload: id
})

export const updateQuantity = (payload) => ({
    type: UPDATE_QUANTITY,
    payload
})

export const clearCart = () => ({
    type: CLEAR_CART
})

export default function cartReducer(state = initialState, action) {
    let newState

    switch (action.type) {
        case ADD_TO_CART: {
            const existingItem = state.items.find(item => item.id === action.payload.id)
            if (existingItem) {
                newState = {
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    )
                }
            } else {
                newState = {
                    items: [...state.items, action.payload]
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(newState.items))
            return newState
        }

        case REMOVE_FROM_CART: {
            newState = {
                items: state.items.filter(item => item.id !== action.payload)
            }
            localStorage.setItem('cartItems', JSON.stringify(newState.items))
            return newState
        }

        case UPDATE_QUANTITY: {
            newState = {
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            }
            localStorage.setItem('cartItems', JSON.stringify(newState.items))
            return newState
        }

        case CLEAR_CART:
            localStorage.removeItem('cartItems')
            return { items: [] }

        default:
            return state
    }
}
