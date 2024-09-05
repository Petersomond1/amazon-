// navigationActions.js

// Action Types
export const SAVE_INTENDED_ROUTE = 'SAVE_INTENDED_ROUTE';
export const CLEAR_INTENDED_ROUTE = 'CLEAR_INTENDED_ROUTE';

// Action Creators
export const saveIntendedRoute = (route) => {
    return {
        type: SAVE_INTENDED_ROUTE,
        payload: route
    };
};

export const clearIntendedRoute = () => {
    return {
        type: CLEAR_INTENDED_ROUTE
    };
};