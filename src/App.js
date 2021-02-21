import React from 'react';
// import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';
// @ts-ignore
import {syncHistoryWithStore} from "react-router-redux";
// import queryString from 'query-string';
// import _get from 'lodash/get';

import Provider from "react-redux/es/components/Provider";
import configureStore from "./redux/configureStore";
import './redux/api';
// import { If, Choose } from 'tsx-control-statements/components';

import './App.css';
import Graphic from "./Graphic/Graphic";

export const store = configureStore();
export const history = syncHistoryWithStore(createBrowserHistory(), store);

function App() {
  return (
      <Provider store={store}>
            <div className="App">
                <Graphic/>
            </div>
      </Provider>
  );
}

export default App;
