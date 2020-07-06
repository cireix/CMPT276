import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'Router';
import 'css/app.scss';
import 'commons/auth';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
    <div>
        <Router /> 
        <ToastContainer />
    </div>,
    document.getElementById('root')
);