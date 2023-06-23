import { createActionTypes, createAction } from "src/redux/helpers/";

export const GET_PLACES_SEARCH = createActionTypes("GET_PLACES_SEARCH");

const getPlacesSearchRequest = () => createAction(GET_PLACES_SEARCH.REQUEST);
const getPlacesSearchSuccess = (data) =>
  createAction(GET_PLACES_SEARCH.SUCCESS, { data });
const getPlacesSearchError = (data) =>
  createAction(GET_PLACES_SEARCH.FAILURE, { data });

export const GET_PLACE_DETAIL = createActionTypes("GET_PLACE_DETAIL");

const getPlaceDetailRequest = (data) =>
  createAction(GET_PLACE_DETAIL.REQUEST, { data });
const getPlaceDetailSuccess = (data) =>
  createAction(GET_PLACE_DETAIL.SUCCESS, { data });
const getPlaceDetailError = (data) =>
  createAction(GET_PLACE_DETAIL.FAILURE, { data });

export const getPlaces = (searchString) => async (dispatch) => {
  dispatch(getPlacesSearchRequest());
  if (searchString) {
    const { AutocompleteService } = await window.google.maps.importLibrary(
      "places"
    );
    const results = await new AutocompleteService().getPlacePredictions({
      input: searchString,
      componentRestrictions: { country: "sg" },
    });
    //console.log("getPlaces", results);
    if (
      results &&
      Array.isArray(results.predictions) &&
      results.predictions.length
    ) {
      dispatch(getPlacesSearchSuccess(results.predictions));
    } else {
      dispatch(getPlacesSearchError({ message: "no results" }));
    }
  } else {
    dispatch(getPlacesSearchSuccess([]));
  }
};

export const getPlaceDetail = (placeId, label) => async (dispatch) => {
  dispatch(getPlaceDetailRequest(label));
  const geocoder = new window.google.maps.Geocoder();

  geocoder.geocode(
    {
      placeId: placeId,
    },
    function (results, status) {
      if (status == "OK" && results.length) {
        const lng = results[0].geometry.location.lng();
        const lat = results[0].geometry.location.lat();
        const address = results[0].formatted_address;

        //console.log("getPlaceDetail success", results, lng, lat, address);
        dispatch(getPlaceDetailSuccess({ address, center: { lng, lat } }));
      } else {
        dispatch(getPlaceDetailError({ message: "no results" }));
      }
    }
  );
};
