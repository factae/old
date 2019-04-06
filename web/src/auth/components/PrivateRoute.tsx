import React from 'react'
import {Route, RouteProps, Redirect} from 'react-router-dom'

import {useCheckAuth} from '../hooks'

export default function(props: RouteProps) {
  const isAuth = useCheckAuth(document.cookie)

  if (!isAuth) {
    return <Redirect to="/login" />
  }

  return <Route {...props} />
}
