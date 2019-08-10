import {
    REQUEST_GET_SEARCH_RESULTS,
    ERROR_GET_SEARCH_RESULTS,
    SUCCESS_GET_SEARCH_RESULTS,
} from '../actionTypes';

const getSearchResults = data => (dispatch) => {
    dispatch({ type: REQUEST_GET_SEARCH_RESULTS });
    //on api promise catch ERROR_GET_SEARCH_RESULTS
    //on api promise then
    dispatch({ type: SUCCESS_GET_SEARCH_RESULTS, payload: data });
};
 
export {
    updatePinned,
    updateHeaders,
};