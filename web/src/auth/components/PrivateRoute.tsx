import React from 'react'
import {Route, RouteProps, Redirect} from 'react-router-dom'
import isNull from 'lodash/isNull'

import useAuthContext from '../context'

export default function(props: RouteProps) {
  const {auth} = useAuthContext()

  if (isNull(auth)) return null
  return auth ? <Route {...props} /> : <Redirect to="/login" />
}
