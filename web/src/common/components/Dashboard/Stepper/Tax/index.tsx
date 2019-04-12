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
          title="N° de TVA Intracommunautaire"
          subtitle="Renseignez uniquement si vous êtes assujetti à la TVA."
        >
          <TextField name="taxId" label="Numéro de TVA" required={false} />
          <TextField
            name="taxRate"
            label="Taux de TVA (%)"
            type="number"
            required={false}
          />
        </Section>

        <Section title="">
          <Submit />
        </Section>
      </Form>
    </Fragment>
  )
}
