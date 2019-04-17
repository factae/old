import React, {Fragment} from 'react'
import isNull from 'lodash/isNull'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import useRouting from '../../common/hooks/routing'
import {useUserPremium} from '../../user/hooks'
import useUserContext from '../../user/context'
import * as $user from '../../user/service'
import {User} from '../../user/model'
import useForm from '../../common/form'
import Header from '../../common/form/Header'
import Section from '../../common/form/Section'
import Submit from '../../common/form/Submit'

import {useStyles} from './styles'

export default function() {
  const {goTo} = useRouting()
  const [user, setUser] = useUserContext()
  const expiresAt = useUserPremium()
  const {Form, Switch} = useForm(user)
  const classes = useStyles()

  async function updateUser(nextUser: User) {
    await $user.update(nextUser)
    setUser(nextUser)
  }

  function renderPremium() {
    if (isNull(expiresAt)) {
      return null
    }

    if (!expiresAt) {
      return (
        <Grid container alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>
              Votre n'avez pas d'abonnement Premium.
            </Typography>
            <Typography gutterBottom>
              Un abonnement Premium vous donne accès à des fonctionnalités
              supplémentaires :
            </Typography>
            <ul>
              <Typography component="li">
                - Transformer un devis en facture
              </Typography>
              <Typography component="li">
                - Créer un devis / une facture à partir d'un modèle
              </Typography>
              <Typography component="li">
                - Envoyer automatiquement les devis et les factures aux clients
              </Typography>
              <Typography component="li">
                - Envoyer des formulaires d'inscription à vos nouveaux clients
              </Typography>
            </ul>
            <Typography gutterBottom>
              En vous abonnant, vous bénéficiez de toutes ces fonctionnalités, +
              toutes les fonctionnalités à venir.
            </Typography>
          </Grid>
        </Grid>
      )
    }

    return (
      <Fragment>
        <Typography>Votre abonnement Premium est toujours actif.</Typography>
        <Typography>
          Expire le {expiresAt.toFormat(`dd/LL/yyyy 'à' HH'h'mm`)} (
          {expiresAt.toRelative({locale: 'fr'})}).
        </Typography>
      </Fragment>
    )
  }

  return (
    <Form
      onSubmit={updateUser}
      onSuccess={{goTo: 'dashboard', message: 'Paramètres mis à jour.'}}
    >
      <Header title="Paramètres" onBack={() => goTo('dashboard')} />

      <Section title="Premium">
        <Grid item xs={12}>
          {renderPremium()}
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
