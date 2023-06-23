import { configureStore } from "@reduxjs/toolkit";

import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from "react-redux";

import rootReducer from "./rootReducer";
import middleware from "./middleware";

const configreStoreDefaultOptions = { reducer: rootReducer };

export const makeReduxStore = (options = configreStoreDefaultOptions) => {
  const store = configureStore(options);
  return store;
};

export const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware);
  },
});
export const useDispatch = () => useReduxDispatch();
export const useSelector = useReduxSelector;
