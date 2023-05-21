import axios, { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import { put, takeLatest, all } from 'redux-saga/effects';
import { ApiService } from '../../../core/services/api.service';
import { setError } from '../../errors/error.actions';
import { ACTION_TYPES } from '../../constants/types';
import { loginSuccess } from './login.actions';

const ENDPOINT = process.env.REACT_APP_API_URL || 'http://localhost:3002';
const apiService = new ApiService();

export function* loginMiddleware({ payload }: AnyAction) {
  try {
    const res: AxiosResponse = yield apiService.post([ENDPOINT + '/login'], { ...payload.data })
    yield put(loginSuccess(res));
    payload.successAction?.(res);
  } catch (error: any) {
    yield put(setError(error));
  }
}

export function* watchLogin() {
  yield all([
    takeLatest(ACTION_TYPES.LOGIN, loginMiddleware),
  ]);
}
