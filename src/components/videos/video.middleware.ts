import axios, { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import { put, takeLatest, all } from 'redux-saga/effects';
import { getVideoList } from './video.actions';
import { ApiService } from '../../core/services/api.service';
import { ACTION_TYPES } from '../../share/constants/types';

const ENDPOINT = process.env.REACT_APP_API_URL || 'http://localhost:3002';

const apiService = new ApiService();

export function* listVideoMiddleware({ payload }: AnyAction) {
  try {
    const res: AxiosResponse = yield apiService.get([ENDPOINT + '/videos'], { ...payload.data });
    payload.successAction?.(res);
  } catch (error: any) {
    console.log("GET_LIST_VIDEO ERROR", error);
  }
}

export function* getVideoMiddleware({ payload }: AnyAction) {
  try {
    const res: AxiosResponse = yield apiService.get([ENDPOINT + `/videos/${payload.videoId}`], {});
    payload.successAction?.(res);
  } catch (error: any) {
    console.log("GET_VIDEO ERROR", error);
  }
}
export function* watchVideo() {
  yield all([
    takeLatest(ACTION_TYPES.GET_LIST_VIDEO, listVideoMiddleware),
    takeLatest(ACTION_TYPES.GET_VIDEO, getVideoMiddleware),
  ]);
}
