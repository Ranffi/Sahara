import axios from 'axios';

const GET_BOOKS = 'GET_BOOKS'
const SINGLE_BOOK = 'SINGLE_BOOK'
const GET_AUTHORS = 'GET_AUTHORS'
const GET_AUTHOR_BOOKS = 'GET_AUTHOR_BOOKS'
const GET_GENRE_BOOKS = 'GET_GENRE_BOOKS'
const GET_GENRE = 'GET_GENRE'
const UPDATE_BOOK = 'UPDATE_BOOK'

const initialState = {
    books: [],
    book: {},
    authors: [],
    genre: [],
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
const deleteBook = (id) => {
    return async(dispatch) => {
        await axios.delete(`/api/books/${id}`)
        const res = await axios.get(`/api/books/${id}`)
        dispatch(_singleBook(res.data))
    }
}

export const _updateBook = (book) => {
    return {
    type: UPDATE_BOOK,
    book
}}

const updateBook = (book) => {
    return async(dispatch) => {
        const res = await axios.put(`/api/books/update/${book.id}`, book)
        dispatch(_updateBook(res.data))
    }
}

export default function bookReducer(state = initialState, action) {
    switch (action.type) {
        case GET_AUTHORS: return { ...state, authors: action.authors}
        case GET_BOOKS: return { ...state, books: action.books}
        case SINGLE_BOOK: return { ...state, book: action.book}
        case GET_AUTHOR_BOOKS: return { ...state, books: action.authorBooks}
        case GET_GENRE_BOOKS: return { ...state, books: action.genreBooks}
        case GET_GENRE: return {...state, genre: action.genre}
        case UPDATE_BOOK: return {...state, book: action.book}
        default: return state
    }
}

export { getBooks, singleBook, getAuthors, getAuthorBooks, getGenreBooks, getGenre, updateBook, deleteBook }
