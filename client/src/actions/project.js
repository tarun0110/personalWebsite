import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROJECTS, PROJECTS_ERROR, GET_PROJECT } from './types';

//to get all projects
export const getProjects = () => async dispatch => {
    try{
        const res = await axios.get('/public/project');
        dispatch({
            type: GET_PROJECTS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: PROJECTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//to get a project by project id
export const getProjectById = id => async dispatch => {

    try {
        const res = await axios.get(`/public/project/${id}`);
        dispatch({
             type: GET_PROJECT,
             payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROJECTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    };
};
