const getActionHandler = (defaultHandler, customHandlers, state, action) =>
  customHandlers[action.type](state, action) ||
  defaultHandler(state, action);

const createReducer = (initialState, defaultHandler, actionTypes, customHandlers) =>
  (state = initialState, action) =>
    actionTypes.includes(action.type) ?
      getActionHandler(defaultHandler, customHandlers, state, action) :
      state;

// export progressState = ()