import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import configureStore, { history } from "./store";
import * as serviceWorker from "./serviceWorker";

import "./index.scss";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ConnectedRouter history={history}>
        <App/>
      </ConnectedRouter>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
