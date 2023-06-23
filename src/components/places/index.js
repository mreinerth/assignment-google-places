import React, { useEffect, useState} from "react";
import "./Places.css";

import { Spin } from "antd";
import { useSelector, useDispatch } from "src/redux";

import PlaceMap from "src/components/map";

import {
  getPlaces,
  getPlaceDetail,
} from "src/redux/actions/places";
import {useGoogleMapsApi} from 'src/hooks/useGoogleMapsApi'
import {
  selectPredictions,
  selectPredictionsLoading,
  selectPlaceDetail,
  selectPlaceDetailLabel,
} from "src/redux/selectors/places";
import { Select } from "antd";

const { Option } = Select;

export const Places = (props) => {
  const dispatch = useDispatch();
  const predictions = useSelector(selectPredictions);
  const predictionsLoading = useSelector(selectPredictionsLoading);

  const placeDetail = useSelector(selectPlaceDetail);
  const placeDetailLabel = useSelector(selectPlaceDetailLabel);

  const { isLoaded, loadError } = useGoogleMapsApi({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    if (selectedPlace?.value) {
      dispatch(getPlaceDetail(selectedPlace.value, selectedPlace.label));
    }
  }, [selectedPlace]);

  /* useEffect(() => {
     console.log("placeDetail", placeDetail);
  }, [placeDetail]);
  useEffect(() => {
     console.log("predictions", predictions);
  }, [predictions]); */

  const handleSearch = (v) => {
    dispatch(getPlaces(v));
  };

  if (!isLoaded) {
    <div>
      <Spin />
    </div>;
  }

  if (loadError) {
    <div>Error loading google api</div>;
  }

  return <div style={{ width: "100%" }}>
      <Select
        className="place-search-select"
        showSearch
        placeholder="Search Places"
        optionFilterProp="children"
        labelInValue
        loading={predictionsLoading}
        onSearch={handleSearch}
        onChange={(v) => {
          //console.log("setSelectedPlace", v);
          setSelectedPlace(v);
        }}
        allowClear
        {...props}
      >
        {(predictions || []).map((prediction) => (
          <Option value={prediction.place_id} key={prediction.place_id}>
            {prediction.description}
          </Option>
        ))}
      </Select>
      {placeDetail && placeDetail.center ? (
        <div>
          <div className="detailLabel">{placeDetailLabel}</div>
          <div className="detailaddress">
            <em>Address: </em>
            {placeDetail.address}{" "}
          </div>
          <div className="mapWrapper">
            <PlaceMap center={placeDetail.center}></PlaceMap>
          </div>
        </div>
      ) : null}
    </div>
};

export default Places;
