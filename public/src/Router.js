import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from 'pages/App';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import ForgotPw from 'pages/ForgotPw';
import AllUsers from 'pages/AllUsers';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={App} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/forgotpw' component={ForgotPw} />
            <Route path='/allusers' component={AllUsers} />
        </Switch>
    </BrowserRouter>
)

export default Router;