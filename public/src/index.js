import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'Router';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { CartReducers } from 'react-cart-components'
import 'globalFunc/auth';
import { ToastContainer } from 'react-toastify';

 
const store = createStore(
  combineReducers({
    cart: CartReducers
  })
);

ReactDOM.render(
    <Provider store = {store}>
        <Router /> 
        <ToastContainer />
    </Provider>,
    document.getElementById('root')
);