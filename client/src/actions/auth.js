import axios from 'axios'
import {REGISTER_FAIL,REGISTER_SUCCESS,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT, AUTH_ERROR, USER_LOADED,CLEAR_PROFILE} from './types'
import { setAlert } from './alert'
import setAuthToken from '../utility/setAuthToken'


export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type : USER_LOADED,
            payload : res.data
        });
    } catch (err) {
        dispatch({
            type : AUTH_ERROR
        });
    }
}


export const register = ({name,email,password}) => async dispatch =>{
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({name,email,password});
    console.log('auth action');
    try {
        //const res = await axios.post('/api/user',body,config);
        const res = await axios.post('/api/user',body,config);

        dispatch({
            type : REGISTER_SUCCESS,
            payload : res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.error;

        if(errors){
            errors.forEach( error => {
                dispatch(setAlert(error.msg,'danger'));
            });
        }

        dispatch({
            type : REGISTER_FAIL
        });
    }
}


export const login = (email,password) => async dispatch =>{
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({email,password});
    try {
        //const res = await axios.post('/api/user',body,config);
        const res = await axios.post('/api/auth',body,config);

        dispatch({
            type : LOGIN_SUCCESS,
            payload : res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.error;

        if(errors){
            errors.forEach( error => {
                dispatch(setAlert(error.msg,'danger'));
            });
        }

        dispatch({
            type : LOGIN_FAIL
        });
    }
}

export const logout = () => dispatch =>{
    dispatch({
        type : CLEAR_PROFILE
    });
    dispatch({
        type : LOGOUT
    });
}