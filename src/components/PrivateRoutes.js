import React from 'react'
import { Redirect, Route } from 'react-router'

const PrivateRoute = props => {
    const isLogged = !!localStorage.getItem('rpg_token')
    return isLogged ? <Route {... props}/> : <Redirect to="/login"/>
}

export default PrivateRoute