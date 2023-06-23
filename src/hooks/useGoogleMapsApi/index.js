import { useEffect, useMemo, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export function useGoogleMapsApi({
  id = "script-loader",
  version = "weekly",
  googleMapsApiKey,
  language,
  libraries = ["places"],
}) {
  const isMounted = useRef(false);
  const [isLoaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(undefined);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loader = useMemo(
    function memo() {
      return new Loader({
        id,
        apiKey: googleMapsApiKey,
        version,
        libraries,
        language,
      });
    },
    [id, googleMapsApiKey, version, libraries, language]
  );

  useEffect(function effect() {
    if (isLoaded) {
      return;
    } else {
      loader
        .load()
        .then(function then() {
          if (isMounted.current) setLoaded(true);
        })
        .catch(function onrejected(error) {
          setLoadError(error);
        });
    }
  }, []);

  return { isLoaded, loadError };
}
