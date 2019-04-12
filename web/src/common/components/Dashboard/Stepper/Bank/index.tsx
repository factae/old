import React, {Fragment} from 'react'
import keys from 'lodash/keys'

import {User, Activity, RateUnit} from '../../../../../user/model'
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
  const {Form, TextField, Select} = useForm<User>(defaultUser)
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
          title="Coordonnées bancaires (optionnel)"
          subtitle="Si vous les remplissez, elles s'afficheront en bas de vos devis et factures. "
        >
          <TextField name="rib" label="RIB" required={false} />
          <TextField name="iban" label="IBAN" required={false} />
          <TextField name="bic" label="BIC" required={false} />
        </Section>

        <Section title="">
          <Submit />
        </Section>
      </Form>
    </Fragment>
  )
}
