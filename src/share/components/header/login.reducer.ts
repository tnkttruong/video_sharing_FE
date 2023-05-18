/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer } from '../../helpers/reducer-factory';
import { ACTION_TYPES } from '../../constants/types';

const initialState = {
    isLoading: false,
    isProcessing: false,
    hasError: false,
    data: null,
    error: null,
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

const strategies = {
    [ACTION_TYPES.LOGIN_SUCCESS]: loginSuccess,
    [ACTION_TYPES.LOGIN]: login,
    __default__: (state: any) => state,
};

const authReducer = createReducer(strategies, initialState);

export default authReducer;
