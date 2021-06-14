import { GET_PROJECT,  GET_PROJECTS, PROJECTS_ERROR } from "../actions/types";

const initialState = {
    project: null,
    projects: [],
    loading: true,
    error: {}
};  

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_PROJECT:
            return {
                ...state,
                project: payload, 
                loading: false
            };
        case GET_PROJECTS:
            return {
                ...state,
                projects: payload,
                loading: false
            };
        case PROJECTS_ERROR:
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

