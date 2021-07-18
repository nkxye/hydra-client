import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./containers/MainPage";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./service-worker";
import { subscribeUser } from "./subscription";
import "./index.css";

ReactDOM.render(
  // <React.StrictMode>
  //   <MainPage />
  // </React.StrictMode>
  <MainPage />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
require("dotenv").config();
serviceWorker.register();
subscribeUser();
