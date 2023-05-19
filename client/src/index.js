import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/styels/index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        {/* <BrowserRouter> */}
        <App />
        {/* </BrowserRouter> */}
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
