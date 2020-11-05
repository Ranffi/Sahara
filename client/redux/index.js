import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import booksReducer from './books'
import userReducer from './user'
import itemReducer from './items'


const appReducer = combineReducers({
    books: booksReducer,
    user: userReducer,
    items: itemReducer
})

const store = createStore(appReducer, applyMiddleware(thunk))
export default store
