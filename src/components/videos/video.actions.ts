import { ACTION_TYPES } from '../../share/constants/types';

export const getVideoList = (payload: object) => ({
    type: ACTION_TYPES.GET_LIST_VIDEO,
    payload,
});

export const getVideo = (payload: any) => ({
    type: ACTION_TYPES.GET_VIDEO,
    payload,
});

export const createVideo = (payload: any) => ({
    type: ACTION_TYPES.CREATE_VIDEO,
    payload,
});
