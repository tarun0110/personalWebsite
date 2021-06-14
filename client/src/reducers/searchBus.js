import { SEARCH_BUS, SEARCH_ERROR, BUS_ERROR, ADD_BUS, EDIT_BUS, GET_BUS } from '../actions/types';

const initialState = {
    buses: [],
    loading: true,
    error: [],
    bus: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SEARCH_BUS:
            return {
                ...state,
                buses: payload.data,
                loading: false,
            };
        case GET_BUS:
            return {
                ...state,
                bus: payload,
                loading: false,
            }
        case SEARCH_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case ADD_BUS:
        case EDIT_BUS:
            return {
                ...state,
                buses: [payload, ...state.buses],
                loading: false,
            };
        case BUS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}
