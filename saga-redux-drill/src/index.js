import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import axios from "axios";
import reducers from "./reducers";
import {Provider} from "react-redux";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://rem-rest-api.herokuapp.com/api"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

