import axios from 'axios';
import { setAlert } from './alert';

import { GET_BLOG, GET_BLOGS, BLOG_ERROR } from './types';

//to get all blogs
export const getBlogs = () => async dispatch => {
    try{
        const res = await axios.get('/public/blog');
        dispatch({
            type: GET_BLOGS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//to get a blog by blog id
export const getBlogById = id => async dispatch => {
    try {
        const res = await axios.get(`/public/blog/${id}`);
        dispatch({
             type: GET_BLOG,
             payload: res.data
        });
    } catch (err) {
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    };
};
