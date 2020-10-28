import { createStore, applyMiddleware} from 'redux'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'
import thunk from 'redux-thunk'

const GET_BOOKS = 'GET_BOOKS'
const SINGLE_BOOK = 'SINGLE_BOOK'
const GET_CARTITMS = 'GET_CARTITMS'

export const _getCartItems = (items) => {
    return {
    type: GET_CARTITMS,
    items
}}

const getCartItems = () => {
    return async(dispatch) => {
        const res = await axios.get('/api/cartItem');
        dispatch(_getCartItems(res.data))
    }
}

const addCartItem = (bookId) => {
    return async(dispatch) => {
        await axios.post('/api/cartItem', {bookId});
        const res = await axios.get('/api/cartItem');
        dispatch(_getCartItems(res.data))
    }
}
const deleteCartItem = (id) => {
    return async(dispatch) => {
        await axios.delete(`/api/cartItem/${id}`);
        const res = await axios.get('/api/cartItem');
        dispatch(_getCartItems(res.data))
    }
}
const updateCartItem = (id, quantity) => {
    return async(dispatch) => {
        await axios.put(`/api/cartItem/${id}`, {quantity});
        const res = await axios.get('/api/cartItem');
        dispatch(_getCartItems(res.data))
    }
}
export const _getBooks = (books) => {
    return {
    type: GET_BOOKS,
    books
}}

const getBooks = () => {
    return async(dispatch) => {
        const res = await axios.get('/api/books')
        dispatch(_getBooks(res.data))
    }
}


export const _singleBook = (book) => {
    return {
    type: SINGLE_BOOK,
    book
}}

const singleBook = (id) => {
    return async(dispatch) => {
        const res = await axios.get(`/api/books/${id}`)
        dispatch(_singleBook(res.data))
    }
}


const reducer = ((state = {books: [], book: {}, authors: [], cartItems: []}, action) => {
    switch (action.type){
        case GET_BOOKS: return { ...state, books: action.books}
        case SINGLE_BOOK: return { ...state, book: action.book}
        case GET_CARTITMS: return { ...state, cartItems: action.items}
        default: return state
    }
})

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunk))
export default  store
export { getBooks, singleBook, addCartItem, getCartItems, deleteCartItem, updateCartItem}
