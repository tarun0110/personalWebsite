import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE,
    ADD_BOOKING,
    BOOKING_ERROR,
    MY_BOOKINGS
} from './types';

import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};
//to get all bookings of a user
export const myBookings = () => async dispatch => {

    try{
        // dispatch(loadUser());
        const res = await axios.get('/api/auth');
        console.log(res);
        const bookings = res.data.bookings;
        console.log(bookings);
        let buses= [];
        for(let i =0; i< bookings.length; i++){
            buses.push(bookings[i].bus);
        }
        console.log(buses);
        dispatch({
            type: MY_BOOKINGS,
            payload: buses
        });

    }catch(err){
        dispatch({
            type: AUTH_ERROR
        });
    }
};

export const register =
    ({ name, email, password }, history) =>
    async dispatch => {
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };

        const body = JSON.stringify({ name, email, password });

        try {
            const res = await axios.post('/api/users', body, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });

            dispatch(loadUser());
            dispatch(
                setAlert(
                    'You have successfully registerd, start with booking a ticket',
                    'success'
                )
            );
            history.push('/login');
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach(error =>
                    dispatch(setAlert(error.msg, 'danger'))
                );
            }
            dispatch({
                type: REGISTER_FAIL,
            });
        }
    };

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password });
    // window.location.reload();

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); // danger is just defined in css and nothisn else
        }
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

// Logout / clear profile

export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
    window.location.reload();
};

export const addBooking = (busId, formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await axios.post(
            `/api/bus/book/${busId}`,
            formData,
            config
        );
        dispatch({
            type: ADD_BOOKING,
            payload: res.data,
        });
        //console.log('ADD_BOOKING DONE!');
        history.push('/ticket');
        //dispatch(setAlert('Booking successful!', 'success'));
        //display ticket
        //dispatch(showTicket())
    } catch (err) {
        dispatch(setAlert('Booking failed', 'danger'));
        dispatch({
            type: BOOKING_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
