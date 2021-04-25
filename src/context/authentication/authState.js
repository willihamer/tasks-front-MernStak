import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import {
    SUCCESSFUL_SIGN_UP,
    ERROR_SIGN_UP,
    GET_USER,
    SUCCESSFUL_LOGIN,
    ERROR_LOGIN,
    SIGN_OUT
} from '../../types';




const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const signUpUser = async data => {
        try {
            const answer = await clientAxios.post('/api/users/', data);
            dispatch({
                type: SUCCESSFUL_SIGN_UP,
                payload: answer.data
            });
            userAuthenticated();
        } catch (error) {
            const alert = {
                message: error.response.data.msg,
                category: "alert-error"
            }
            dispatch({
                type: ERROR_SIGN_UP,
                payload: alert
            })
        }
    }

    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }
        try {
            const answer = await clientAxios.get('/api/auth');
            dispatch({
                type: GET_USER,
                payload: answer.data.user
            });
        } catch (error) {
            dispatch({
                type: ERROR_LOGIN,
            })
        }
    }

    // When the user login
    const loginUser = async data => {
        try {
            const answer = await clientAxios.post('/api/auth', data);
            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: answer.data
            });
            //Get the user
            userAuthenticated();
        } catch (error) {
            const alert = {
                message: error.response.data.msg,
                category: "alert-error"
            }
            dispatch({
                type: ERROR_LOGIN,
                payload: alert
            })
        }
    }

    // close user session
    const logout = () => {
        dispatch({
            type: SIGN_OUT
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                signUpUser,
                loginUser,
                userAuthenticated,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState

