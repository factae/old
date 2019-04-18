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
  const {Form, TextField, submit} = useForm<User>(defaultUser)
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
        <Section
          title="RIB (optionnel)"
          subtitle="Ces informations s'afficheront sur vos documents, pour faciliter le paiement de vos clients. "
        >
          <TextField name="rib" label="RIB" required={false} />
          <TextField name="iban" label="IBAN" required={false} />
          <TextField name="bic" label="BIC" required={false} />
        </Section>
      </Form>

      <Submit onNext={submit} />
    </Fragment>
  )
}
