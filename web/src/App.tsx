import React, {Suspense, lazy} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Font} from '@react-pdf/renderer'
import {MuiPickersUtilsProvider} from 'material-ui-pickers'
import LuxonUtils from '@date-io/luxon'
import CssBaseline from '@material-ui/core/CssBaseline'
import ThemeProvider from '@material-ui/styles/ThemeProvider'

import AsyncContext from './common/contexts/async'
import Snackbar from './common/components/Snackbar'
import Navigation from './common/components/Navigation'
import Login from './auth/components/Login'
import Register from './auth/components/Register'
import Confirm from './user/components/Confirm'
import PrivateRoute from './auth/components/PrivateRoute'
import theme from './theme'

const Dashboard = lazy(() => import('./common/components/Dashboard'))

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
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')

  function start() {
    setLoading(true)
  }

  function stop(nextMessage?: string | void) {
    setLoading(false)

    if (!message && nextMessage) {
      setMessage(nextMessage || '')
    }
  }

  function close() {
    setMessage('')
  }

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider locale="fr" utils={LuxonUtils}>
        <AsyncContext.Provider value={{loading, start, stop}}>
          <CssBaseline />
          <Snackbar message={message} onClose={close} />
          <BrowserRouter>
            <Navigation />
            <Suspense fallback={null}>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/confirm/:token" component={Confirm} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <Redirect to="/dashboard" />
              </Switch>
            </Suspense>
          </BrowserRouter>
        </AsyncContext.Provider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}
