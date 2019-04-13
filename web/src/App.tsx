import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Font} from '@react-pdf/renderer'
import {MuiPickersUtilsProvider} from 'material-ui-pickers'
import LuxonUtils from '@date-io/luxon'
import CssBaseline from '@material-ui/core/CssBaseline'
import ThemeProvider from '@material-ui/styles/ThemeProvider'

import AsyncProvider from './async/provider'
import AuthProvider from './auth/provider'
import UserProvider from './user/provider'
import PaymentProvider from './payment/provider'
import Navigation from './common/components/Navigation'
import Register from './auth/components/Register'
import Login from './auth/components/Login'
import ResetPassword from './auth/components/ResetPassword'
import SetPassword from './auth/components/SetPassword'
import Dashboard from './common/components/Dashboard'
import PrivateRoute from './auth/components/PrivateRoute'
import Landing from './landing'
import theme from './theme'

Font.register(
  'https://raw.githubusercontent.com/google/fonts/master/ofl/quicksand/Quicksand-Regular.ttf',
  {
    family: 'Quicksand',
  },
)

Font.register(
  'https://raw.githubusercontent.com/google/fonts/master/ofl/quicksand/Quicksand-Bold.ttf',
  {
    family: 'Quicksand Bold',
  },
)

export default function() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MuiPickersUtilsProvider locale="fr" utils={LuxonUtils}>
        <BrowserRouter>
          <AsyncProvider>
            <AuthProvider>
              <UserProvider>
                <PaymentProvider>
                  <Navigation />
                  <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route
                      exact
                      path="/password/reset"
                      component={ResetPassword}
                    />
                    <Route
                      exact
                      path="/password/:token"
                      component={SetPassword}
                    />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <Redirect to="/" />
                  </Switch>
                </PaymentProvider>
              </UserProvider>
            </AuthProvider>
          </AsyncProvider>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}
