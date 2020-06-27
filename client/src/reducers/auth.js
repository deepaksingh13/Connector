import {REGISTER_FAIL,REGISTER_SUCCESS,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT, AUTH_ERROR, USER_LOADED, DELETE_ACCOUNT} from '../actions/types'

const initailState = {
    token : localStorage.getItem("token"),
    isAuthenticated : null,
    loading : true,
    user : null
}

export default function(state = initailState,action){
    const {type , payload } = action;

    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:    
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated : true,
                loading : false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:    
        case DELETE_ACCOUNT:
            localStorage.removeItem('token');
            return {
                ...state,
                token : null,
                isAuthenticated : false,
                loading : false
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated : true,
                loading : false,
                user : payload
            }

        default:
            return state

    }
}