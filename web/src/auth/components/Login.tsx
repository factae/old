import React, {useEffect, useRef} from 'react'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import isLength from 'validator/lib/isLength'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import useAsyncContext from '../../async/context'
import useRouting from '../../common/hooks/routing'
import {PartialUser, emptyUser} from '../../user/model'
import useForm from '../../common/form'
import * as $auth from '../../auth/service'

import {useStyles} from './styles'

export default function() {
  const async = useAsyncContext()
  const {goTo} = useRouting()
  const classes = useStyles()

  const defaultUser = useRef(emptyUser())
  const {Form, TextField} = useForm<PartialUser>(defaultUser.current)

  async function register({email, password}: PartialUser) {
    if (isEmpty(email) || !isEmail(email)) {
      throw new Error('email invalide')
    }

    if (isEmpty(password) || !isLength(password, {min: 6})) {
      throw new Error('mot de passe invalide (6 caractères min.)')
    }

    try {
      await $auth.login(email, password)
      window.location.href = '/dashboard'
    } catch (error) {
      console.error(error.toString())

      if (/403$/.test(error.message)) {
        throw new Error('email ou mot de passe invalide')
      } else {
        throw new Error('serveur')
      }
    }
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
          onSuccess={{message: '', goTo: 'dashboard'}}
        >
          <TextField
            grid={{xs: 12}}
            margin="dense"
            type="email"
            label="Email"
            name="email"
            autoFocus
          />

          <TextField
            grid={{xs: 12}}
            margin="dense"
            type="password"
            label="Mot de passe"
            name="password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
          >
            Se connecter
          </Button>
        </Form>
      </Paper>

      <Button
        className={classes.changeAction}
        onClick={() => goTo('register')}
        fullWidth
        variant="outlined"
        size="small"
        color="default"
      >
        Pas de compte ?
      </Button>
    </main>
  )
}
