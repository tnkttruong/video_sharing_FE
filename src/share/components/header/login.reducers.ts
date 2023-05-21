/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer } from '../../helpers/reducer-factory';
import { ACTION_TYPES } from '../../constants/types';
const localUser = localStorage.getItem('currentUser');
const currentUser = localUser ? JSON.parse(localUser) : null
const initialState = {
  isLoading: false,
  isProcessing: false,
  hasError: false,
  data: null,
  error: null,
  currentUser: currentUser
};

const loginSuccess = (state: any, payload: any) => ({
  ...state,
  isLoading: false,
  data: payload,
});

const login = (state: any, payload: any) => ({
  ...state,
  isLoading: true,
});

const updateCurrentUser = (state: any, payload: any) => ({
  ...state,
  currentUser: payload
})

const strategies = {
  [ACTION_TYPES.LOGIN_SUCCESS]: loginSuccess,
  [ACTION_TYPES.LOGIN]: login,
  [ACTION_TYPES.UPDATE_CURRENT_USER]: updateCurrentUser,
  __default__: (state: any) => state,
};

const authReducer = createReducer(strategies, initialState);

export default authReducer;
