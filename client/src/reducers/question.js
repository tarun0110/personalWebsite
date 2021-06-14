import { QUESTION_ERROR, POST_QUESTION } from "../actions/types";

const initialState = {
    question: null,
    loading: true,
    error: {}
};  

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case POST_QUESTION:
            return {
                ...state,
                question: payload, 
                loading: false
            };
        case QUESTION_ERROR:
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

