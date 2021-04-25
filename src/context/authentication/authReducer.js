import {
    SUCCESSFUL_SIGN_UP,
    ERROR_SIGN_UP,
    GET_USER,
    SUCCESSFUL_LOGIN,
    ERROR_LOGIN,
    SIGN_OUT
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case SUCCESSFUL_LOGIN:
        case SUCCESSFUL_SIGN_UP:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }
        case SIGN_OUT:
        case ERROR_LOGIN:
        case ERROR_SIGN_UP:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                authenticated: false,
                message: action.payload,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                loading: false
            }
        default:
            break;
    }
}