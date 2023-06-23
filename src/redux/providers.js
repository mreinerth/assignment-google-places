/* Core */
import { Provider } from "react-redux";
import { reduxStore } from "./store";

export const ReduxProvider = (props) => {
  return <Provider store={reduxStore}>{props.children}</Provider>;
};
