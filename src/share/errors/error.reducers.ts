/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer } from '../helpers/reducer-factory';
import { ACTION_TYPES } from '../constants/types';

const initialState = {
  isLoading: false,
  isProcessing: false,
  hasError: false,
  data: null,
  error: null,
};

const setError = (state: any, payload: any) => ({
  ...state,
  isLoading: false,
  hasError: true,
  error: payload,
});

const clearError = (state: any, payload: any) => ({
  ...state,
  isLoading: false,
  hasError: false,
  error: null,
});

const strategies = {
  [ACTION_TYPES.SET_ERROR]: setError,
  [ACTION_TYPES.CLEAR_ERROR]: clearError,
  __default__: (state: any) => state,
};

const errorReducer = createReducer(strategies, initialState);

export default errorReducer;
