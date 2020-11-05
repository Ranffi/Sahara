import axios from 'axios'

const GET_CARTITMS = 'GET_CARTITMS'
const GET_ORDERS = 'GET_ORDERS'
const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS'
const ADD_CART_ITEM = 'ADD_CART_ITEM'

const initialState = {
    cartItems: [],
    orderHistory: []
}

export const _getCartItems = (items) => {
    return {
    type: GET_CARTITMS,
    items
}}

 const getCartItems = (id) => {
    return async(dispatch) => {
        const res = await axios.get(`/api/cartItem/${id}`);
        dispatch(_getCartItems(res.data))
    }
}

export const _updateCartItems = (items) => {
    return {
        type: UPDATE_CART_ITEMS,
        items
    }
}

const updateCartItems = (token) => {
    return async(dispatch) => {
        const res = await axios.post('api/checkout', token)
        dispatch(_updateCartItems(res.data))
    }
}

export const _addCartItem = (item) => {
    return {
        type: ADD_CART_ITEM,
        item
    }
}

 const addCartItem = (bookId, userId) => {
    return async(dispatch) => {
        const res = await axios.post('/api/cartItem', {bookId, userId});
        dispatch(_addCartItem(res.data))
    }
}
 const deleteCartItem = (id, userId) => {
    return async(dispatch) => {
        await axios.delete(`/api/cartItem/${id}`);
        const res = await axios.get(`/api/cartItem/${userId}`);
        dispatch(_getCartItems(res.data))
    }
}
 const updateCartItem = (id, quantity, userId) => {
    return async(dispatch) => {
        await axios.put(`/api/cartItem/${id}`, {quantity});
        const res = await axios.get(`/api/cartItem/${userId}`);
        dispatch(_getCartItems(res.data))
    }
}

export const _getOrders = (orderHistory) => {
    return {
    type: GET_ORDERS,
    orderHistory
}}

const getOrderHistory = (userId) => {
    return async(dispatch) => {
        const res = await axios.get(`/api/orderHistory/${userId}`)
        dispatch(_getOrders(res.data))
    }
}

export default function itemReducer (state = initialState, action) {

    switch (action.type) {
        case GET_CARTITMS: return { ...state, cartItems: action.items}
        case UPDATE_CART_ITEMS: return {...state, cartItems: action.items}
        case GET_ORDERS: return {...state, orderHistory: action.orderHistory }
        case ADD_CART_ITEM: return {...state, cartItems: [...state.cartItems, {...action.item}]}
        default: return state
    }
}

export { addCartItem, getCartItems, updateCartItems, deleteCartItem,
    updateCartItem, getOrderHistory}
