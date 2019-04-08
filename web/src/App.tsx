import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Font} from '@react-pdf/renderer'
import {MuiPickersUtilsProvider} from 'material-ui-pickers'
import LuxonUtils from '@date-io/luxon'
import CssBaseline from '@material-ui/core/CssBaseline'
import ThemeProvider from '@material-ui/styles/ThemeProvider'

import AsyncProvider from './async/provider'
import UserProvider from './user/provider'
import PaymentProvider from './payment/provider'
import Navigation from './common/components/Navigation'
import Login from './auth/components/Login'
import Register from './auth/components/Register'
import Dashboard from './common/components/Dashboard'
import Confirm from './user/components/Confirm'
import PrivateRoute from './auth/components/PrivateRoute'
import Landing from './landing'
import theme from './theme'

Font.register(
  'https://raw.githubusercontent.com/google/fonts/master/apache/roboto/Roboto-Regular.ttf',
  {
    family: 'Roboto',
  },
)

Font.register(
  'https://raw.githubusercontent.com/google/fonts/master/apache/roboto/Roboto-Italic.ttf',
  {
    family: 'Roboto Italic',
  },
)

Font.register(
  'https://raw.githubusercontent.com/google/fonts/master/apache/roboto/Roboto-Bold.ttf',
  {
    family: 'Roboto Bold',
  },
)

Font.register(
  'https://raw.githubusercontent.com/google/fonts/master/apache/robotocondensed/RobotoCondensed-Regular.ttf',
  {
    family: 'Roboto Condensed',
  },
)

Font.register(
  'https://raw.githubusercontent.com/google/fonts/master/apache/robotocondensed/RobotoCondensed-Bold.ttf',
  {
    family: 'Roboto Condensed Bold',
  },
)

export default function() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider locale="fr" utils={LuxonUtils}>
        <AsyncProvider>
          <UserProvider>
            <PaymentProvider>
              <CssBaseline />
              <BrowserRouter>
                <Navigation />
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/confirm/:token" component={Confirm} />
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                  <Redirect to="/" />
                </Switch>
              </BrowserRouter>
            </PaymentProvider>
          </UserProvider>
        </AsyncProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}
