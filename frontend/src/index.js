import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App";
import { persistor, store } from "./Redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
    <App />
  </Provider>
</PersistGate>
);
