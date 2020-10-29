import { createStore, applyMiddleware} from 'redux'
import loggerMiddleware from 'redux-logger'
import axios from 'axios'
import thunk from 'redux-thunk'

const GET_BOOKS = 'GET_BOOKS'
const SINGLE_BOOK = 'SINGLE_BOOK'
const GET_CARTITMS = 'GET_CARTITMS'
const GET_AUTHORS = 'GET_AUTHORS'
const GET_AUTHOR_BOOKS = 'GET_AUTHOR_BOOKS'
const GET_GENRE_BOOKS = 'GET_GENRE_BOOKS'
const GET_GENRE = 'GET_GENRE'
const GET_USER = 'GET_USER'

const initialState = {
    books: [],
    book: {},
    authors: [],
    cartItems: [],
    user: {},
    genre: []
}
export const _getGenre = (genre) => {
    return {
    type: GET_GENRE,
    genre
}}

 const getGenre = () => {
    return async(dispatch) => {
        const res = await axios.get('/api/genre');
        dispatch(_getGenre(res.data))
    }
}
export const _getGenreBooks = (genreBooks) => {
    return {
    type: GET_GENRE_BOOKS,
    genreBooks
}}

 const getGenreBooks = (id) => {
    return async(dispatch) => {
        const res = await axios.get(`/api/books/genre/${id}`);
        dispatch(_getGenreBooks(res.data))
    }
}

export const _getAuthorBooks = (authorBooks) => {
    return {
    type: GET_AUTHOR_BOOKS,
    authorBooks
}}

 const getAuthorBooks = (id) => {
    return async(dispatch) => {
        const res = await axios.get(`/api/books/author/${id}`);
        dispatch(_getAuthorBooks(res.data))
    }
}

export const _getCartItems = (items) => {
    return {
    type: GET_CARTITMS,
    items
}}

 const getCartItems = (id) => {
    return async(dispatch) => {
      console.log("----->>>>>>",id);
        const res = await axios.get(`/api/cartItem/${id}`);
        dispatch(_getCartItems(res.data))
    }
}

export const _getAuthors = (authors) => {
    return {
    type: GET_AUTHORS,
    authors
}}

 const getAuthors = () => {
    return async(dispatch) => {
        const res = await axios.get('/api/author');
        dispatch(_getAuthors(res.data))
    }
}

 const addCartItem = (bookId, userId) => {
    return async(dispatch) => {
        await axios.post('/api/cartItem', {bookId, userId});
        const res = await axios.get(`/api/cartItem/${userId}`);
        dispatch(_getCartItems(res.data))
    }
}
 const deleteCartItem = (id,userId) => {
    return async(dispatch) => {
        await axios.delete(`/api/cartItem/${id}`);
        const res = await axios.get(`/api/cartItem/${userId}`);
        dispatch(_getCartItems(res.data))
    }
}
 const updateCartItem = (id, quantity,userId) => {
    return async(dispatch) => {
        await axios.put(`/api/cartItem/${id}`, {quantity});
        const res = await axios.get(`/api/cartItem/${userId}`);
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
        case GET_AUTHORS: return { ...state, authors: action.authors}
        case GET_BOOKS: return { ...state, books:action.books}
        case SINGLE_BOOK: return { ...state, book:action.book}
        case GET_CARTITMS: return { ...state, cartItems: action.items}
        case GET_USER: return {...state, user: action.user}
        case GET_AUTHOR_BOOKS: return { ...state, books: action.authorBooks}
        case GET_GENRE_BOOKS: return { ...state, books: action.genreBooks}
        case GET_GENRE: return {...state, genre: action.genre}
        default: return state
    }
})

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunk))
export default  store
export { getBooks, singleBook, addCartItem, getCartItems, deleteCartItem,
    updateCartItem, getAuthors, getAuthorBooks, getGenreBooks, getGenre, getUser}
