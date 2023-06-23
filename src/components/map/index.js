import React, { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

export const PlaceMap = ({ center }) => {
  const ref = React.useRef();
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom: 18,
      });
      if (marker) {
        marker.setMap(null);
      }
      var vMarker = new window.google.maps.Marker({
        position: center,
      });
      vMarker.setMap(map);
      setMarker(vMarker);
    }
  }, [ref,center]);

  return <div ref={ref} id="map" style={containerStyle} />;
};

export default PlaceMap;

