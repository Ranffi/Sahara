import axios from 'axios';
import {getCartItems} from './items.js'

const GET_USER = 'GET_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const LOGIN_USER = 'LOGIN_USER';
const GET_ADDRESS = 'GET_ADDRESS';
const GET_ALL_USERS = 'GET_ALL_USERS';
const GET_ALL_ADMINS = 'GET_ALL_ADMINS';
const SIGN_UP = 'SIGN_UP';


const initialState = {
    user: {},
    address: {},
    users: [],
    admins: [],
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

export const _getAllUsers = (users) => {
    return {
    type: GET_ALL_USERS,
    users
}}

 const getAllUsers = () => {
    return async(dispatch) => {
        const res = await axios.get('/api/users');
        dispatch(_getAllUsers(res.data))
    }
}


export const _getAllAdmins = (admins) => {
    return {
    type: GET_ALL_ADMINS,
    admins
}}

 const getAllAdmins = () => {
    return async(dispatch) => {
        const res = await axios.get('/api/users/admins');
        dispatch(_getAllAdmins(res.data))
    }
}

const manageAdmin = (id, adminStatus) => {
    return async(dispatch) => {

        await axios.put(`/api/users/admin/${id}`, { adminStatus });
        const res = await axios.get('/api/users/admins');
        dispatch(_getAllAdmins(res.data))
    }
}

export const _logoutUser = (user) => {
    return {
        type: LOGOUT_USER,
        user
    }
}

const logoutUser = () => {
    return async(dispatch) => {
        await axios.post('/api/logout')
        const res = await axios.get('/api/users/get-user')
        await dispatch(getCartItems(res.data.id))
        dispatch(_logoutUser(res.data))
    }
}

export const _loginUser = (user) => {
    return {
        type: LOGIN_USER,
        user
    }
}

const loginUser = (loginCreds) => {
    return async(dispatch) => {
        const res = await axios.post('/api/login', loginCreds)
        await dispatch(getCartItems(res.data.id))
        dispatch(_loginUser(res.data))
    }
}

export const _signUp = (user) => {
    return {
        type: SIGN_UP,
        user
    }
}

const signUp = (userId, infoObject) => {
    return async(dispatch) => {
        const res = await axios.put(`/api/users/${userId}`, infoObject)
        dispatch(_signUp(res.data))
    }
}

export const _getAddress = (address) => {
    return {
    type: GET_ADDRESS,
    address
}}

const getAddress = (id) => {
    return async(dispatch) => {
        const res = await axios.get(`/api/address/${id}`)
        dispatch(_getAddress(res.data[0]))
    }
}


export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER: return {...state, user: action.user}
        case LOGOUT_USER: return {...state, user: action.user}
        case LOGIN_USER: return {...state, user: action.user}
        case GET_ADDRESS: return {...state, address: action.address}
        case GET_ALL_USERS: return {...state, users: action.users }
        case GET_ALL_ADMINS: return {...state, admins: action.admins }
        case SIGN_UP: return {...state, user: action.user}
        default: return state

    }
}

export { getUser, signUp, logoutUser, loginUser, getAllUsers, manageAdmin, getAllAdmins, getAddress }
