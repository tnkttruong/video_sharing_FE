const makeActionTypes = (type: string) => ({
    [`${type}`]: type,
    [`${type}_SUCCESS`]: `${type}_SUCCESS`,
    [`${type}_ERROR`]: `${type}_ERROR`,
    [`CLEAR_${type}`]: `CLEAR_${type}`,
    [`SET_${type}`]: `SET_${type}`,
});

export const ACTION_TYPES = {
    ...makeActionTypes('LOGIN'),
    ...makeActionTypes('GET_LIST_VIDEO'),
    ...makeActionTypes('GET_VIDEO'),
    ...makeActionTypes('CREATE_VIDEO'),
    ...makeActionTypes('UPDATE_CURRENT_USER'),
    ...makeActionTypes('SET_ERROR'),
    ...makeActionTypes('CLEAR_ERROR'),
};
