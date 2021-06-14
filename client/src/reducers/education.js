import { GET_EDUCATION,  GET_EDUCATIONS, EDUCATION_ERROR } from "../actions/types";

const initialState = {
    education: null,
    educations: [],
    loading: true,
    error: {}
};  

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_EDUCATION:
            return {
                ...state,
                education: payload, 
                loading: false
            };
        case GET_EDUCATIONS:
            return {
                ...state,
                educations: payload,
                loading: false
            };
        case EDUCATION_ERROR:
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

