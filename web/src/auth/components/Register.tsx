import React from 'react'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import isLength from 'validator/lib/isLength'
import Button from '@material-ui/core/Button'
import {InputLabelProps} from '@material-ui/core/InputLabel'
import {OutlinedInputProps} from '@material-ui/core/OutlinedInput'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import AsyncContext from '../../common/contexts/async'
import useRouting from '../../common/hooks/routing'
import * as authService from '../../auth/service'

import {useStyles} from './styles'

type LoginEventTarget = EventTarget & {
  email: HTMLInputElement
  password: HTMLInputElement
}

export default function() {
  const async = React.useContext(AsyncContext)
  const {goTo} = useRouting()
  const classes = useStyles()

  const inputProps: Partial<OutlinedInputProps> = {
    classes: {
      root: classes.inputRoot,
      focused: classes.inputFocused,
      notchedOutline: classes.inputNotchedOutline,
    },
  }

  const inputLabelProps: InputLabelProps = {
    classes: {
      root: classes.labelRoot,
      focused: classes.labelFocused,
    },
  }

  function register(event: React.FormEvent) {
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
      .register(email, password)
      .catch(error => async.stop(`Erreur : ${error.message}`))
      .then(() => async.stop('Compte créé.'))
      .then(goTo('login'))
  }

  return (
    <main className={classes.main}>
      <Paper elevation={8} className={classes.paper}>
        <Typography component="h1" variant="h3" className={classes.title}>
          factAE
        </Typography>

        <form className={classes.form} onSubmit={register}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            margin="dense"
            autoFocus
            InputProps={inputProps}
            InputLabelProps={inputLabelProps}
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
            InputProps={inputProps}
            InputLabelProps={inputLabelProps}
            disabled={async.loading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            className={classes.submit}
            disabled={async.loading}
          >
            Créer un compte
          </Button>
        </form>
      </Paper>

      <Button
        className={classes.changeAction}
        onClick={goTo('login')}
        fullWidth
        variant="outlined"
        size="small"
        color="default"
        disabled={async.loading}
      >
        Déjà un compte ?
      </Button>
    </main>
  )
}
