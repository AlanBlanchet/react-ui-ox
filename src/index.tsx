import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./components/App";
import { cursorReducer } from "./redux";

export const cursorStore = createStore(cursorReducer);
// ReactDOM.render
render(
  <Provider store={cursorStore}>
    <App />
  </Provider>,
  document.getElementById("app")
);
