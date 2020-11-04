import axios from 'axios';

const GET_USER = 'GET_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const LOGIN_USER = 'LOGIN_USER';

const initialState = {
    user: {}
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
        await axios.post('/api/login', loginCreds)
        const res = await axios.get('/api/users/get-user')
        dispatch(_loginUser(res.data))
    }
}


export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER: return {...state, user: action.user}
        case LOGOUT_USER: return {...state, user: action.user}
        case LOGIN_USER: return {...state, user: action.user}
        default: return state

    }
}

export { getUser, logoutUser, loginUser }
