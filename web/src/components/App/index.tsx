import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import ThemeProvider from '@material-ui/styles/ThemeProvider'

import AsyncContext from '../../contexts/async'
import Snackbar from '../Snackbar'
import Navigation from '../Navigation'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import PrivateRoute from '../Auth/PrivateRoute'
import Dashboard from '../Dashboard'
import theme from './theme'

export default function() {
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')

  function start() {
    setLoading(true)
  }

  function stop(message?: string | void) {
    setLoading(false)
    setMessage(message || '')
  }

  function close() {
    setMessage('')
  }

  return (
    <ThemeProvider theme={theme}>
      <AsyncContext.Provider value={{loading, start, stop}}>
        <CssBaseline />
        <Snackbar message={message} onClose={close} />
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Redirect to="/dashboard" />
          </Switch>
        </BrowserRouter>
      </AsyncContext.Provider>
    </ThemeProvider>
  )
}
