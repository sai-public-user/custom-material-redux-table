import { 
    REQUEST_GET_SEARCH_RESULTS,
    ERROR_GET_SEARCH_RESULTS,
    SUCCESS_GET_SEARCH_RESULTS,
  } from '../actionTypes';
  
  const initalState = {
    loading: false,
    error: null,
  };
  
  const getSearchResults = (state = initalState, action) => {
    const { type, payload } = action;
    switch (type) {
      case REQUEST_GET_SEARCH_RESULTS:
        return {
          ...state,
          loading: true,
          error: null,
        }
      case ERROR_GET_SEARCH_RESULTS:
          return {
              ...state,
              loading: false,
              error: true,
          }
      case SUCCESS_GET_SEARCH_RESULTS:
        return {
          ...state,
          loading: false,
          error: null,
          ...payload,
        }
      default:
        return state;
    }
  }
  
  export default getSearchResults;