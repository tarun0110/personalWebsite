import axios from 'axios';
import { setAlert } from './alert';

import { QUESTION_ERROR, POST_QUESTION } from './types';

//to post a question
export const postQuestion = (formData) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/public/question',  formData, config);
        dispatch({
            type: POST_QUESTION,
            payload: res.data
        });
        dispatch(setAlert('Sumitted', 'success'));
        window.alert('Submitted successfully');
    }catch(err){
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: QUESTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

