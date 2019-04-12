import React, {useEffect, useRef} from 'react'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import Button from '@material-ui/core/Button'
import {InputLabelProps} from '@material-ui/core/InputLabel'
import {OutlinedInputProps} from '@material-ui/core/OutlinedInput'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconNext from '@material-ui/icons/ChevronRight'

import useAsyncContext from '../../../async/context'
import useAuthContext from '../../../auth/context'
import useRouting from '../../../common/hooks/routing'
import {PartialUser, emptyUser} from '../../../user/model'
import useForm from '../../../common/form'

import {useStyles as useParentStyles} from '../styles'
import {useStyles} from './styles'

export default function() {
  const async = useAsyncContext()
  const auth = useAuthContext()
  const {goTo} = useRouting()
  const parentClasses = useParentStyles()
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

  function goToLogin() {
    goTo('login')
  }

  async function register({email}: PartialUser) {
    if (isEmpty(email) || !isEmail(email)) {
      throw new Error('email invalide')
    }

    await auth.register(email)
  }

  useEffect(() => {
    async.stop()
  }, [])

  return (
    <main className={parentClasses.main}>
      <Paper elevation={8} className={parentClasses.paper}>
        <Typography component="h1" variant="h3" className={parentClasses.title}>
          factAE
        </Typography>

        <Typography variant="subtitle1" className={parentClasses.subtitle}>
          Créer un compte
        </Typography>

        <Form
          className={parentClasses.form}
          onSubmit={register}
          onSuccess={{
            message: `Compte créé avec succès. Vous allez recevoir un lien d'activation par mail.`,
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            className={parentClasses.submit}
          >
            <IconNext />
            Suivant
          </Button>
        </Form>
      </Paper>

      <Button
        className={parentClasses.changeAction}
        onClick={goToLogin}
        fullWidth
        variant="outlined"
        size="small"
        color="default"
      >
        Se connecter
      </Button>
    </main>
  )
}
