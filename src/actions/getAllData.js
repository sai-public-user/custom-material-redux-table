import { 
    REQUEST_UPDATE_DAYS,
    SUCCESS_UPDATE_DAYS,
    ERROR_UPDATE_DAYS,
} from '../actionTypes';

const manageDays = data => (dispatch) => {
        dispatch({ type: REQUEST_UPDATE_DAYS });
        //in case of api calls change post get patch delete accordingly
        // return axios.get('api path', data).then((res) => {
        //     dispatch({ type: SUCCESS_UPDATE_DAYS, payload: res });
        // }).catch((err) => {
        //     dispatch({ type: ERROR_UPDATE_DAYS, payload: err });
        // });
        dispatch({ type: SUCCESS_UPDATE_DAYS, payload: data });
    };
  
    
    export { manageDays };