import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,
    ADD_BOOKING,
    BOOKING_ERROR,
    MY_BOOKINGS,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    buses: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case MY_BOOKINGS:
            return {
                ...state,
                loading: false,
                buses: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            localStorage.removeItem('busId');
            localStorage.removeItem('email');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                loading: false,
            };
        case ADD_BOOKING:
            return {
                ...state,
                user: { ...state.user, bookings: payload },
                loading: false,
            };
        case BOOKING_ERROR: {
            return {
                ...state,
                loading: false,
            };
        }
        default:
            return state;
    }
}
