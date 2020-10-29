import { createStore, applyMiddleware} from 'redux'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'
import thunk from 'redux-thunk'

const GET_BOOKS= "GET_BOOKS"
const SINGLE_BOOK= "SINGLE_BOOK"
const ADD_CARTITEM = "ADD_CARTITEM"
const GET_CARTITMS = "GET_CARTITMS"
const GET_USER = 'GET_USER'

const initialState = {
    books: [],
    book: {},
    authors: [],
    cartItems: [],
    user: {}
}

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

export const _addCartItem = (item) => {
    return {
    type: ADD_CARTITEM,
    item
}}

const addCartItem = (bookId) => {
    return async(dispatch) => {
        const res = await axios.post('/api/cartItem', {bookId});
        dispatch(_addCartItem(res.data))
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

export const _getUser = (user) => {
    return {
    type: GET_USER,
    user
}}

const getUser = () => {
    return async(dispatch) => {
        const res = await axios.get('/api/users/get-user')
        dispatch(_getUser(res.data))
    }
}


const reducer = ((state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKS: return { ...state, books:action.books}
        case SINGLE_BOOK: return { ...state, book:action.book}
        case GET_CARTITMS: return { ...state, cartItems:action.items} 
        case ADD_CARTITEM: return { ...state, cartItems:[...state.cartItems,action.item]}
        case GET_USER: return {...state, user: action.user}
        default: return state
    }
})

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunk))
export default  store
export { getBooks, singleBook, addCartItem, getCartItems, getUser }
