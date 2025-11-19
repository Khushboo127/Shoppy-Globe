// Redux store configuration
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import searchReducer from './searchSlice'

const store = {
    getState: () => ({
        cart: {
            items: JSON.parse(localStorage.getItem('cartItems') || '[]')
        },
        search: {
            searchTerm: ''
        }
    }),
    subscribe: () => () => { },
    dispatch: () => { }
}

// Using plain Redux instead of Redux Toolkit for simplicity
import { createStore, combineReducers } from 'redux'

const rootReducer = combineReducers({
    cart: cartReducer,
    search: searchReducer
})

const reduxStore = createStore(rootReducer)

export default reduxStore
