import {
    REQUEST_MANAGE_PINNED_COLS,
    SUCCESS_MANAGE_PINNED_COLS,
} from '../actionTypes';

const updatePinned = data => (dispatch) => {
    dispatch({ type: REQUEST_MANAGE_PINNED_COLS });
    dispatch({ type: SUCCESS_MANAGE_PINNED_COLS, payload: data });
};
 
export { updatePinned };