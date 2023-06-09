import { ACTION_TYPES } from '../../constants/types';

export const login = (payload: object) => ({
  type: ACTION_TYPES.LOGIN,
  payload,
});

export const loginSuccess = (payload: any) => ({
  type: ACTION_TYPES.LOGIN_SUCCESS,
  payload,
});
export const updateCurrentUser = (payload: any) => ({
  type: ACTION_TYPES.UPDATE_CURRENT_USER,
  payload,
})
