import React, {useEffect, useRef} from 'react'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import isLength from 'validator/lib/isLength'
import Button from '@material-ui/core/Button'
import {InputLabelProps} from '@material-ui/core/InputLabel'
import {OutlinedInputProps} from '@material-ui/core/OutlinedInput'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import useAsyncContext from '../../async/context'
import useAuthContext from '../../auth/context'
import useRouting from '../../common/hooks/routing'
import {PartialUser, emptyUser} from '../../user/model'
import useForm from '../../common/form'

import {useStyles} from './styles'

export default function() {
  const async = useAsyncContext()
  const auth = useAuthContext()
  const {goTo} = useRouting()
  const classes = useStyles()

  const defaultUser = useRef(emptyUser())
  const {Form, TextField} = useForm<PartialUser>(defaultUser.current)

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

  async function register({email, password}: PartialUser) {
    if (isEmpty(email) || !isEmail(email)) {
      throw new Error('email invalide')
    }

    if (isEmpty(password) || !isLength(password, {min: 6})) {
      throw new Error('mot de passe invalide (6 caractères min.)')
    }

    try {
      await auth.register(email, password)
      goToLogin()
    } catch (error) {
      console.error(error.toString())
      throw new Error(error.message)
    }
  }

  function goToLogin() {
    goTo('login')
  }

  useEffect(() => {
    async.stop()
  }, [])

  return (
    <main className={classes.main}>
      <Paper elevation={8} className={classes.paper}>
        <Typography component="h1" variant="h3" className={classes.title}>
          factAE
        </Typography>

        <Form
          className={classes.form}
          onSubmit={register}
          onSuccess={{
            message: `Compte créé. Vous allez recevoir un lien d'activation par mail.`,
            goTo: 'login',
          }}
        >
          <TextField
            grid={{xs: 12}}
            margin="dense"
            type="email"
            label="Email"
            name="email"
            autoFocus
            InputProps={inputProps}
            InputLabelProps={inputLabelProps}
          />

          <TextField
            grid={{xs: 12}}
            margin="dense"
            type="password"
            label="Mot de passe"
            name="password"
            InputProps={inputProps}
            InputLabelProps={inputLabelProps}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            className={classes.submit}
          >
            Créer un compte
          </Button>
        </Form>
      </Paper>

      <Button
        className={classes.changeAction}
        onClick={goToLogin}
        fullWidth
        variant="outlined"
        size="small"
        color="default"
      >
        Déjà un compte ?
      </Button>
    </main>
  )
}
