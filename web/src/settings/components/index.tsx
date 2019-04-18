import React, {Fragment} from 'react'
import isNull from 'lodash/isNull'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import useRouting from '../../common/hooks/routing'
import {checkUserSubscription} from '../../user/utils'
import useUserContext from '../../user/context'
import * as $user from '../../user/service'
import {User} from '../../user/model'
import useForm from '../../common/form'
import Header from '../../common/form/Header'
import Section from '../../common/form/Section'
import Submit from '../../common/form/Submit'

export default function() {
  const {goTo} = useRouting()
  const [user, setUser] = useUserContext()
  const expiresAt = checkUserSubscription(user)
  const {Form, Switch} = useForm(user)

  async function updateUser(nextUser: User) {
    await $user.update(nextUser)
    setUser(nextUser)
  }

  return (
    <Form
      onSubmit={updateUser}
      onSuccess={{goTo: 'dashboard', message: 'Paramètres mis à jour.'}}
    >
      <Header title="Paramètres" onBack={() => goTo('dashboard')} />

      <Section title="Abonnement">
        <Grid item xs={12}>
          {expiresAt ? (
            <Typography>
              Expire le {expiresAt.toFormat(`dd/LL/yyyy 'à' HH'h'mm`)} (
              {expiresAt.toRelative({locale: 'fr'})}).
            </Typography>
          ) : null}
        </Grid>
      </Section>

      <Section title="Documents">
        <Switch
          name="documentAutoSend"
          label="Envoi automatique des documents au client"
        />
      </Section>

      <Submit />
    </Form>
  )
}
