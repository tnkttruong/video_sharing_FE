import { combineReducers } from 'redux';
import authReducer from '../share/components/header/login.reducer';
import errorReducer from '../share/errors/error.reducers';
const reducers = {
	authReducer: authReducer,
	errorReducer: errorReducer
};

const appReducer = combineReducers({ ...reducers });
export default appReducer;
