import React from 'react'
import {Route, RouteProps, Redirect} from 'react-router-dom'

import {isAuth} from '../hooks'

export default function(props: RouteProps) {
  return isAuth() ? <Route {...props} /> : <Redirect to="/login" />
}
