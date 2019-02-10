import React from 'react'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import isLength from 'validator/lib/isLength'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import AsyncContext from '../../contexts/async'
import useRouting from '../../hooks/routing'
import * as authService from '../../services/auth'

import {useStyles} from './styles'

type LoginEventTarget = EventTarget & {
  email: HTMLInputElement
  password: HTMLInputElement
}

export default function() {
  const async = React.useContext(AsyncContext)
  const {goTo} = useRouting()
  const classes = useStyles()

  function login(event: React.FormEvent) {
    event.preventDefault()
    async.start()

    const target = event.target as LoginEventTarget
    const email = target.email.value.trim()
    const password = target.password.value.trim()

    if (isEmpty(email) || !isEmail(email)) {
      return async.stop('Erreur : email invalide')
    }

    if (isEmpty(password) || !isLength(password, {min: 6})) {
      return async.stop('Erreur : mot de passe invalide (6 caractères min.)')
    }

    authService
      .login(email, password)
      .catch(error => async.stop(`Erreur : ${error.message}`))
      .then(goTo('dashboard'))
  }

  return (
    <main className={classes.main}>
      <Paper elevation={8} className={classes.paper}>
        <Typography component="h1" variant="h3" className={classes.title}>
          FactAE
        </Typography>

        <form className={classes.form} onSubmit={login}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            margin="dense"
            autoFocus
            disabled={async.loading}
          />

          <TextField
            required
            fullWidth
            label="Mot de passe"
            type="password"
            name="password"
            margin="dense"
            variant="outlined"
            disabled={async.loading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            disabled={async.loading}
          >
            Se connecter
          </Button>
        </form>
      </Paper>

      <Button
        className={classes.changeAction}
        onClick={goTo('register')}
        fullWidth
        variant="outlined"
        size="small"
        color="default"
        disabled={async.loading}
      >
        Pas de compte ?
      </Button>
    </main>
  )
}
