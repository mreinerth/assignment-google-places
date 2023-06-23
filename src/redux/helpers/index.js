export const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

//Enforcing flux standard action (FSA)
export const createAction = (type, payload = {}, error = false, meta = null) => ({
  type,
  payload,
  error,
  meta,
});

const REQUEST_SUFFIX = '_REQUEST';
const SUCCESS_SUFFIX = '_SUCCESS';
const FAILURE_SUFFIX = '_FAILURE';


export function createActionTypes(type)  {
  return {
    REQUEST: `${type}${REQUEST_SUFFIX}`,
    SUCCESS: `${type}${SUCCESS_SUFFIX}`,
    FAILURE: `${type}${FAILURE_SUFFIX}`,
  };
}