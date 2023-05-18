import axios, { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import { put, takeLatest, all } from 'redux-saga/effects';
import { getVideoList, getVideoListSuccess } from './video.actions';
import { ApiService } from '../../core/services/api.service';
import { ACTION_TYPES } from '../../share/constants/types';

const ENDPOINT = process.env.REACT_APP_API_URL || 'http://localhost:3002';

const apiService = new ApiService();

export function* listVideoMiddleware({ payload }: AnyAction) {
  try {
    const res: AxiosResponse = yield apiService.get([ENDPOINT + '/videos'], { ...payload.data });
    yield put(getVideoListSuccess(res));
    payload.successAction?.(res);
  } catch (error: any) {
    console.log("GET_LIST_VIDEO ERROR", error);
  }
}
export function* watchVideo() {
  yield all([
    takeLatest(ACTION_TYPES.GET_LIST_VIDEO, listVideoMiddleware),
  ]);
}
