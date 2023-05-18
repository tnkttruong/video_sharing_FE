export const createReducer =
  (strategies: any, initialState: any) =>
    (state = initialState, { type, payload }: { type: any, payload: any }) =>
      (strategies[type] ?? strategies.__default__)(state, payload);
