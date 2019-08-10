import { createStore, combineReducers, applyMiddleware } from 'redux';
import GetAllData from '../reducers/getAllData';
import table from '../reducers/table';
import getSearchResults from '../reducers/search';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    GetAllData,
    table, 
    getSearchResults,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
);

export default store;