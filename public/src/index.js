import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'Router';

import 'globalFunc/auth';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
    <div>
        <Router /> 
        <ToastContainer />
    </div>,
    document.getElementById('root')
);