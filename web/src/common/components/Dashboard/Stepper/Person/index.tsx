import React, {Fragment} from 'react'

import {User} from '../../../../../user/model'
import useUserContext from '../../../../../user/context'
import * as $user from '../../../../../user/service'
import useForm from '../../../../../common/form'
import Section from '../../../../../common/form/Section'
import useStepperContext from '../context'
import Submit from '../Submit'

import {useStyles} from './styles'

export default function() {
  const [defaultUser, setUser] = useUserContext()
  const {nextStep} = useStepperContext()
  const {Form, TextField} = useForm<User>(defaultUser)
  const classes = useStyles()

  async function updateUser(nextUser: User) {
    await $user.update(nextUser)
    setUser(nextUser)
    nextStep()
  }

  return (
    <Fragment>
      <Form
        className={classes.form}
        onSubmit={updateUser}
        onSuccess={{message: ''}}
        onError={{message: "Erreur lors de l'enregistrement."}}
      >
        <Section title="Identité">
          <TextField name="firstName" label="Prénom" autoFocus />
          <TextField name="lastName" label="Nom de famille" />
          <TextField name="email" label="Email" type="email" disabled />
          <TextField name="phone" label="Téléphone" />
        </Section>

        <Section title="Adresse postale">
          <TextField name="address" label="Adresse" />
          <TextField name="zip" label="Code postal" type="number" />
          <TextField name="city" label="Ville" />
        </Section>

        <Section title="">
          <Submit />
        </Section>
      </Form>
    </Fragment>
  )
}
