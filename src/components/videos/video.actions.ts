import { ACTION_TYPES } from '../../share/constants/types';

export const getVideoList = (payload: object) => ({
    type: ACTION_TYPES.GET_LIST_VIDEO,
    payload,
});

export const getVideoListSuccess = (payload: any) => ({
    type: ACTION_TYPES.GET_LIST_VIDEO_SUCCESS,
    payload,
});
