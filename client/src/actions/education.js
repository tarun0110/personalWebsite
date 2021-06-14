import axios from 'axios';
import { setAlert } from './alert';

import { GET_EDUCATION, GET_EDUCATIONS,EDUCATION_ERROR  } from './types';

//to get all educations
export const getEducations = () => async dispatch => {
    try{
        const res = await axios.get('/public/education');
        dispatch({
            type: GET_EDUCATIONS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: EDUCATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//to get a education by edu id
export const getEducationByID = id => async dispatch => {

    try {
        const res = await axios.get(`/public/education/${id}`);
        dispatch({
             type: GET_EDUCATION,
             payload: res.data
        });
    } catch (err) {
        dispatch({
            type: EDUCATION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    };
};
