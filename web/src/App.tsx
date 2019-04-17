import React, {lazy} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import ThemeProvider from '@material-ui/styles/ThemeProvider'

import AsyncProvider from './async/provider'
import AuthProvider from './auth/provider'
import Navigation from './common/components/Navigation'
import Landing from './landing'
import theme from './theme'

const Register = lazy(() => import('./auth/components/Register'))
const Login = lazy(() => import('./auth/components/Login'))
const ResetPassword = lazy(() => import('./auth/components/ResetPassword'))
const SetPassword = lazy(() => import('./auth/components/SetPassword'))
const PrivateRoute = lazy(() => import('./auth/components/PrivateRoute'))
const Dashboard = lazy(() => import('./common/components/Dashboard'))

export default function() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AsyncProvider>
        <AuthProvider>
          <BrowserRouter>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/password/reset" component={ResetPassword} />
              <Route exact path="/password/:token" component={SetPassword} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Redirect to="/" />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
      </AsyncProvider>
    </ThemeProvider>
  )
}
