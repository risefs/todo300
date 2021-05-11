import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./firebase";
import generateStore from "./redux/store";
// import AppRouter from "./components/AppRouter";
import App from './App';
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "antd/dist/antd.css";

let store:any = generateStore();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();