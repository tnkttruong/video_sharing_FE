import { ACTION_TYPES } from '../../share/constants/types';

export const setLatestSharedVideoId = (payload: any) => ({
  type: ACTION_TYPES.SET_LATEST_SHARED_VIDEO_ID,
  payload
});