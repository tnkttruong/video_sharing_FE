import { ACTION_TYPES } from '../constants/types';

export const clearError = () => ({
  type: ACTION_TYPES.CLEAR_ERROR,
});

export const setError = (payload: any) => ({
  type: ACTION_TYPES.SET_ERROR,
  payload,
});
