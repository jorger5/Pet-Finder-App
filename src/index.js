import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Store from "./Context/Store";

import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <BrowserRouter basename="/">
    <Store>
      <App />
    </Store>
  </BrowserRouter>,
  document.getElementById("root")
);
