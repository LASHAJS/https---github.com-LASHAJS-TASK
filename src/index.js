import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './redux/reducers/store';
import { Provider } from "react-redux";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
        <Router>
        <App />
        </Router>
  </Provider>
);
