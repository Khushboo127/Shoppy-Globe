// Search reducer and actions
const initialState = {
    searchTerm: ''
}

const SET_SEARCH_TERM = 'SET_SEARCH_TERM'

export const setSearchTerm = (term) => ({
    type: SET_SEARCH_TERM,
    payload: term
})

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return { searchTerm: action.payload }
        default:
            return state
    }
}
