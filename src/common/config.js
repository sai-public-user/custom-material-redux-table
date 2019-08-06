import { createStore, combineReducers, applyMiddleware } from 'redux';
import GetAllData from '../reducers/getAllData';
import table from '../reducers/table';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    GetAllData,
    table, 
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
);

export default store;