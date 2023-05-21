/* eslint-disable @typescript-eslint/no-unused-vars */
import { createReducer } from '../../share/helpers/reducer-factory';
import { ACTION_TYPES } from '../../share/constants/types';

const initialState = {
  latestSharedVideoId: null,
};

const setLatestSharedVideoId = (state: any, payload: any) => ({
  ...state,
  latestSharedVideoId: payload,
});


const strategies = {
  [ACTION_TYPES.SET_LATEST_SHARED_VIDEO_ID]: setLatestSharedVideoId,
  __default__: (state: any) => state,
};

const notificationReducer = createReducer(strategies, initialState);

export default notificationReducer;
