import {
    REQUEST_MANAGE_PINNED_COLS,
    SUCCESS_MANAGE_PINNED_COLS,
    REQUEST_MANAGE_HEADERS,
    SUCCESS_MANAGE_HEADERS,
} from '../actionTypes';

const updatePinned = data => (dispatch) => {
    dispatch({ type: REQUEST_MANAGE_PINNED_COLS });
    dispatch({ type: SUCCESS_MANAGE_PINNED_COLS, payload: data });
};

const updateHeaders = data => (dispatch) => {
    dispatch({ type: REQUEST_MANAGE_HEADERS });
    dispatch({ type: SUCCESS_MANAGE_HEADERS, payload: data });
};
 
export {
    updatePinned,
    updateHeaders,
};