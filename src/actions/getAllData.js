import { 
    REQUEST_UPDATE_DAYS,
    SUCCESS_UPDATE_DAYS,
    REQUEST_UPDATE_SwitchData,
    SUCCESS_UPDATE_SwitchData,
    TOGGLE_TABLE_FILTER,
} from '../actionTypes';

const manageDays = data => (dispatch) => {
    dispatch({ type: REQUEST_UPDATE_DAYS });
    console.log(data);
    //in case of api calls change post get patch delete accordingly
    // return axios.get('api path', data).then((res) => {
    //     dispatch({ type: SUCCESS_UPDATE_DAYS, payload: res });
    // }).catch((err) => {
    //     dispatch({ type: ERROR_UPDATE_DAYS, payload: err });
    // });
    dispatch({ type: SUCCESS_UPDATE_DAYS, payload: data });
};

const manageSwitchData = data => (dispatch) => {
    dispatch({ type: REQUEST_UPDATE_SwitchData });
    dispatch({ type: SUCCESS_UPDATE_SwitchData, payload: data });
};

const toggleTableFilter = (filterType, isDownload) => (dispatch) => {
    dispatch({ type: TOGGLE_TABLE_FILTER, payload: {
        filterType,
        isDownload,
    }});
}


export {
    manageDays,
    manageSwitchData,
    toggleTableFilter,
};