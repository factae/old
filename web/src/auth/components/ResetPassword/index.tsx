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
import {PartialUser, emptyUser} from '../../../user/model'
import useForm from '../../../common/form'

import {useStyles as useParentStyles} from '../styles'
import {useStyles} from './styles'

export default function() {
  const async = useAsyncContext()
  const auth = useAuthContext()
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

  async function reset({email}: PartialUser) {
    if (isEmpty(email) || !isEmail(email)) {
      throw new Error('email invalide')
    }

    await auth.reset(email)
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
          Mot de passe oublié
        </Typography>

        <Form
          className={parentClasses.form}
          onSubmit={reset}
          onSuccess={{
            message: `Demande prise en compte. Vous allez recevoir un mail de confirmation.`,
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
            color="default"
            size="large"
            className={parentClasses.submit}
          >
            <IconNext />
            Suivant
          </Button>
        </Form>
      </Paper>
    </main>
  )
}
