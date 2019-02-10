import React from 'react'
import {Route, RouteProps, Redirect} from 'react-router-dom'

import useAuth from '../../hooks/auth'

export default function(props: RouteProps) {
  const auth = useAuth(document.cookie)

  if (!auth) {
    return <Redirect to="/login" />
  }

  return <Route {...props} />
}
