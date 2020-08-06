import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import store from './store';
import { getUser } from './globalFunc/auth';
import { setUser } from "./globalFunc/Socket";


const user = getUser();
setUser(user);
ReactDOM.render(
    <Provider store = {store}>
        <Router />
        <ToastContainer />
    </Provider>,
    document.getElementById('root')
);
