import { 
    REQUEST_MANAGE_PINNED_COLS,
    SUCCESS_MANAGE_PINNED_COLS,
  } from '../actionTypes';
  
  const initalState = {
    loading: false,
    error: null,
    pinned: [],
  };
  
  const getAllData = (state = initalState, action) => {
    const { type, payload } = action;
    switch (type) {
      case REQUEST_MANAGE_PINNED_COLS:
        return {
          ...state,
          loading: false,
          error: null,
        }
      case SUCCESS_MANAGE_PINNED_COLS:
        return {
          ...state,
          loading: false,
          error: null,
          pinned: payload,
        }
      default:
        return state;
    }
  }
  
  export default getAllData;