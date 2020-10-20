import { createStore, applyMiddleware} from "redux"
import loggerMiddleware from "redux-logger"
import axios from "axios"
import thunk from "redux-thunk"

const GET_BOOKS= "GET_BOOKS"

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





const reducer = ((state={books:[], users:[], authors:[]},action)=>{
    switch(action.type){
        case GET_BOOKS: return { ...state, books:action.books}
        default: return state
    }
})

const store= createStore(reducer, applyMiddleware(loggerMiddleware,thunk))
export default  store
export { getBooks }