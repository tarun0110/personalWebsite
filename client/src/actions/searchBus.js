import axios from 'axios';
import { setAlert } from './alert';

import { SEARCH_BUS, SEARCH_ERROR, ADD_BUS, BUS_ERROR, EDIT_BUS, GET_BUS } from './types';

// to get all the buses
export const getBuses = () => async dispatch => {
    try {
        const res = await axios.get('/api/bus/');
        console.log(res);
        dispatch({
            type: SEARCH_BUS,
            payload: res,
        });
    } catch (err) {
        dispatch({
            type: SEARCH_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// get bus by bus id
export const getBus = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/bus/${id}`);
        console.log(res);
        dispatch({
            type: GET_BUS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: SEARCH_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
    // window.location.reload();
  
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    
};


//add a bus
export const addBus = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await axios.post('/api/bus', formData, config);
        dispatch({
            type: ADD_BUS,
            payload: res.data,
        });

        dispatch(setAlert('Bus added!', 'success'));
    } catch (err) {
        dispatch({
            type: BUS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};


//edit a bus
export const editBus = (id,formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await axios.post(`/api/bus/edit/${id}`, formData, config);
        
        dispatch({
            type: EDIT_BUS,
            payload: res.data,
        });

        dispatch(setAlert('Bus edited!', 'success'));
    } catch (err) {
        dispatch({
            type: BUS_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
