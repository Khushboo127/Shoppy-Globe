// SearchBar component for filtering products
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../redux/searchSlice'
import '../styles/search-bar.css'

export default function SearchBar() {
    const dispatch = useDispatch()
    const searchTerm = useSelector(state => state.search.searchTerm)

    const handleSearch = (e) => {
        dispatch(setSearchTerm(e.target.value))
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />
        </div>
    )
}
