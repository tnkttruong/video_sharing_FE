import { combineReducers } from 'redux';
import authReducer from '../share/components/header/login.reducers';
import errorReducer from '../share/errors/error.reducers';
import notificationReducer from '../components/notifications/notification.reducers';
const reducers = {
	authReducer: authReducer,
	errorReducer: errorReducer,
	notificationReducer: notificationReducer
};

const appReducer = combineReducers({ ...reducers });
export default appReducer;
