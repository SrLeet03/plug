import React from 'react'

import LoginForm from './authRoutes/LoginForm'
import Dashboard from './dashboard/Dashboard'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './authRoutes/PrivateRoute';
import PublicRoute from './authRoutes/PublicRoute';


export default function Main() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <PublicRoute restricted={true} component={LoginForm} path="/" exact />
                    <PublicRoute restricted={true} component={LoginForm} path="/login" exact />
                    <PrivateRoute component={Dashboard} state='dashb' path="/dashboard" exact />
                </Switch>
            </BrowserRouter>
        </div>

    )
}
