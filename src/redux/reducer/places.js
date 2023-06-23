import { GET_PLACES_SEARCH ,GET_PLACE_DETAIL} from "src/redux/actions/places";
import { createReducer } from "src/redux/helpers/";

const initialState = {
  predictions: [],
  predictionsLoading: false,
  placeDetailLabel:"",
  placeDetail: {},
  placeDetailLoading: false,
};

const actionHandlers = {
  [GET_PLACES_SEARCH.REQUEST]: (state, action) => ({
    ...state,
    predictionsLoading: true,
  }),
  [GET_PLACES_SEARCH.SUCCESS]: (state, action) => ({
    ...state,
    predictions: action.payload.data,
    predictionsLoading: false,
  }),
  [GET_PLACES_SEARCH.FAILURE]: (state, action) => ({
    ...state,
    predictions: [],
    predictionsLoading: false,
  }),

  [GET_PLACE_DETAIL.REQUEST]: (state, action) => ({
    ...state,
    placeDetailLabel:action.payload.data,
    placeDetailLoading: true,
  }),
  [GET_PLACE_DETAIL.SUCCESS]: (state, action) => ({
    ...state,
    placeDetail: action.payload.data,
    placeDetailLoading: false,
  }),
  [GET_PLACE_DETAIL.FAILURE]: (state, action) => ({
    ...state,
    placeDetail: {},
    placeDetailLoading: false,
  }),
};

export default createReducer(initialState, actionHandlers);
