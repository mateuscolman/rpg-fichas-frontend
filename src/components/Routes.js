import React from 'react'
import { Router, Switch, Route } from "react-router";

import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import Room from '../pages/Room/Room'
import NotFound from './NotFound'
import PrivateRoute from './PrivateRoutes'

import history from '../history'

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route component={Login} exact path="/login"/>
            <PrivateRoute component={Home} exact path="/"/>
            <PrivateRoute component={Room} exact path="/room/:id"/>
            <PrivateRoute component={NotFound}/>
        </Switch>
    </Router>
)

export default Routes