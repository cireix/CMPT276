import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import store from './store';

ReactDOM.render(
    <Provider store = {store}>
        <Router />
        <ToastContainer />
    </Provider>,
    document.getElementById('root')
);
