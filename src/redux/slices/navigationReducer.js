// navigationReducer.js

import { SAVE_INTENDED_ROUTE, CLEAR_INTENDED_ROUTE } from '../actions/navigationActions'

const initialState = {
    intendedRoute: null
};

const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_INTENDED_ROUTE:
            return {
                ...state,
                intendedRoute: action.payload
            };
        case CLEAR_INTENDED_ROUTE:
            return {
                ...state,
                intendedRoute: null
            };
        default:
            return state;
    }
};

export default navigationReducer;