import {
    ROUTER_STATE_CHANGE,

    LOGIN_SUCCESS,
    LOGIN_FAILURE,

    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from '../constants/ActionTypes';


const initialState = {
    error: null,
    token: null
};

export default (state = initialState, action) => {
    'use strict';

    switch (action.type) {

        case ROUTER_STATE_CHANGE:
            return {
                ...state,
                error: null
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                error: null,
                token: action.token
            };

        case LOGIN_FAILURE:
        case LOGOUT_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case LOGOUT_SUCCESS:
            return { ...initialState };

        default:
            return state;
    }
}
