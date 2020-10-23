import { createStore, applyMiddleware} from "redux"
import loggerMiddleware from "redux-logger"
import axios from "axios"
import thunk from "redux-thunk"

const GET_BOOKS= "GET_BOOKS"
const SINGLE_BOOK= "SINGLE_BOOK"

export const _getBooks=(books)=>{
    return {
    type:GET_BOOKS,
    books
}}

const getBooks=()=>{
    return async(dispatch)=>{
        const res= await axios.get('/api/books')
        dispatch(_getBooks(res.data))
    }
}


export const _singleBook=(book)=>{
    return {
    type:SINGLE_BOOK,
    book
}}

const singleBook=(id)=>{
    return async(dispatch)=>{
        const res= await axios.get(`/api/books/${id}`)
        dispatch(_singleBook(res.data))
    }
}



const reducer = ((state={books:[], book:{}, authors:[]},action)=>{
    switch(action.type){
        case GET_BOOKS: return { ...state, books:action.books}
        case SINGLE_BOOK: return { ...state, book:action.book}

        default: return state
    }
})

const store= createStore(reducer, applyMiddleware(loggerMiddleware,thunk))
export default  store
export { getBooks, singleBook}
