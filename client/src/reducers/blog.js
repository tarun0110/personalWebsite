import { GET_BLOGS, GET_BLOG, BLOG_ERROR } from "../actions/types";

const initialState = {
    blog: null,
    blogs: [],
    loading: true,
    error: {}
};  

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_BLOG:
            return {
                ...state,
                blog: payload, 
                loading: false
            };
        case GET_BLOGS:
            return {
                ...state,
                blogs: payload,
                loading: false
            };
        case BLOG_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        // case CLEAR_PROFILE:
        //     return {
        //         ...state,
        //         profile: null,
        //         loading: false
        //     }
        default:
            return state;
    };
}

