import axios from 'axios'

const GET_CARTITMS = 'GET_CARTITMS'
const GET_ORDERS = 'GET_ORDERS'

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

 const addCartItem = (bookId, userId) => {
    return async(dispatch) => {
        await axios.post('/api/cartItem', {bookId, userId});
        const res = await axios.get(`/api/cartItem/${userId}`);
        dispatch(_getCartItems(res.data))
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
        case GET_ORDERS: return {...state, orderHistory: action.orderHistory }
        default: return state
    }
}

export { addCartItem, getCartItems, deleteCartItem,
    updateCartItem, getOrderHistory}
