import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';
const root = ReactDOM.createRoot(document.getElementById('root'));

 axios.defaults.baseURL='http://localhost:9000/';
 axios.defaults.headers.post['Content-Type']='application/json';
 axios.defaults.headers.post['Accept']='application/json'

 axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token expiration or invalid token error
      // You can redirect to the login page or perform other actions
      // ...
    }
    return Promise.reject(error);
  }
);
 
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
