import { 
    REQUEST_MANAGE_PINNED_COLS,
    SUCCESS_MANAGE_PINNED_COLS,
    REQUEST_MANAGE_HEADERS,
    SUCCESS_MANAGE_HEADERS,
  } from '../actionTypes';
  
  const initalState = {
    loading: false,
    error: null,
    pinned: [],
    excludeHeaders: ['select_all'],
    exHeadersNames: ['Select All'],
  };
  
  const getAllData = (state = initalState, action) => {
    const { type, payload } = action;
    switch (type) {
      case REQUEST_MANAGE_PINNED_COLS:
        return {
          ...state,
          loading: true,
          error: null,
        }
      case SUCCESS_MANAGE_PINNED_COLS:
        return {
          ...state,
          loading: false,
          error: null,
          pinned: payload,
        }
      case REQUEST_MANAGE_HEADERS:
        return {
          ...state,
          loading: true,
        }
      case SUCCESS_MANAGE_HEADERS:
        return {
          ...state,
          loading: false,
          ...payload,
        }
      default:
        return state;
    }
  }
  
  export default getAllData;