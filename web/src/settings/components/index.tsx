import React, {Fragment} from 'react'
import isNull from 'lodash/isNull'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconSave from '@material-ui/icons/Save'
import IconPremium from '@material-ui/icons/Star'

import useRouting from '../../common/hooks/routing'
import usePaymentContext from '../../payment/context'
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
  const premium = useUserPremium()
  const {openPaymentDialog} = usePaymentContext()
  const {Form, Switch} = useForm(user)
  const classes = useStyles()

  async function updateUser(nextUser: User) {
    await $user.update(nextUser)
    setUser(nextUser)
  }

  function checkPremium() {
    if (!premium) {
      openPaymentDialog()
      return false
    }
  }

  function renderPremium() {
    if (isNull(premium)) {
      return null
    }

    if (!premium) {
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
          <Grid className={classes.subscribe} item xs={12} md={6}>
            <Button variant="outlined" onClick={openPaymentDialog}>
              <IconPremium className={classes.icon} />
              Souscrire
            </Button>
          </Grid>
        </Grid>
      )
    }

    return (
      <Fragment>
        <Typography>Votre abonnement Premium est toujours actif.</Typography>
        <Typography>
          Expire le {premium.toFormat(`dd/LL/yyyy 'à' HH'h'mm`)} (
          {premium.toRelative({locale: 'fr'})}).
        </Typography>
      </Fragment>
    )
  }

  return (
    <Form
      onSubmit={updateUser}
      onSuccess={{goTo: 'dashboard', message: 'Paramètres mis à jour.'}}
    >
      <Header
        title="Paramètres"
        onBack={() => goTo('dashboard')}
        action={{
          label: 'Sauvegarder',
          icon: IconSave,
        }}
      />

      <Section title="Premium">
        <Grid item xs={12}>
          {renderPremium()}
        </Grid>
      </Section>

      <Section title="Devis">
        <Switch
          name="quotationAutoSend"
          label="Envoi automatique des devis au client"
          onChange={checkPremium}
        />
      </Section>

      <Section title="Facture">
        <Switch
          name="invoiceAutoSend"
          label="Envoi automatique des factures au client"
          onChange={checkPremium}
        />
      </Section>

      <Submit />
    </Form>
  )
}
