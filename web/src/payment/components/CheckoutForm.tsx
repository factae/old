import React, {FormEvent, Fragment} from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconSecure from '@material-ui/icons/Lock'
import IconSafe from '@material-ui/icons/Security'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import {DateTime} from 'luxon'
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement,
  injectStripe,
  ReactStripeElements,
} from 'react-stripe-elements'

import useAsyncContext from '../../async/context'
import Link from '../../common/components/Link'
import {post} from '../../common/utils/axios'
import useUserContext from '../../user/context'

import {useStyles} from './styles'

function CheckoutForm({stripe}: ReactStripeElements.InjectedStripeProps) {
  const [user, setUser] = useUserContext()
  const async = useAsyncContext()
  const classes = useStyles()

  async function charge(event?: FormEvent) {
    if (event) event.preventDefault()
    if (isNil(stripe)) return
    if (isNil(user)) return

    async.start()

    try {
      const name = `${user.firstName} ${user.lastName}`
      const tokenRes = await stripe.createToken({name})
      const token = get(tokenRes, 'token.id', null)
      const paymentRes = await post('/payment', {token})

      if (paymentRes.status !== 200) {
        throw new Error(paymentRes.statusText)
      }

      const expiresAt = DateTime.fromISO(paymentRes.data)
      await setUser({...user, expiresAt: expiresAt.toISO()})
      async.stop(
        `Paiement effectué. Votre abonnement expire le ${expiresAt.toFormat(
          "dd/LL/yyyy 'à' HH'h'mm",
        )}.`,
      )
    } catch (error) {
      console.debug(error.response.data)
      async.stop(`Erreur : ${error.message}`)
    }
  }

  return (
    <Fragment>
      <Typography gutterBottom component="h1" variant="h2">
        Abonnement expiré
      </Typography>

      <Typography variant="body1">
        Votre abonnement est arrivé à échéance. L'abonnement est de 12 mois,
        soit 12 € :
      </Typography>

      <form className={classes.form} onSubmit={charge}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <CardNumberElement
              className={classes.input}
              placeholder="Numéro de carte"
              hideIcon={false}
            />
          </Grid>
          <Grid item xs={12} sm={3} lg={2}>
            <CardExpiryElement className={classes.input} />
          </Grid>
          <Grid item xs={12} sm={3} lg={2}>
            <CardCVCElement className={classes.input} />
          </Grid>
          <Grid item xs={12} sm={6} md={12} lg={2}>
            <Button
              type="submit"
              color="secondary"
              variant="outlined"
              onClick={charge}
              className={classes.pay}
            >
              <IconSecure className={classes.icon} fontSize="small" />
              Payer 12 €
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography variant="body1">
        <IconSafe fontSize="small" />
        <em>
          Le paiement est <strong>sécurisé</strong> et <strong>anonyme</strong>.
        </em>
      </Typography>

      <Typography gutterBottom variant="body1">
        <em>Aucune information liée à votre transaction n'est conservée.</em>
      </Typography>

      <br />

      <Typography gutterBottom component="h2" variant="h6">
        Pourquoi je ne peux pas choisir un mois d'abonnement ?
      </Typography>

      <Typography gutterBottom variant="body1">
        <Link to="https://stripe.com/">Stripe</Link>, la solution de paiement en
        ligne utilisée par factAE,{' '}
        <Link to="https://stripe.com/fr-FR/pricing">
          prélève 1,4% + 25 centimes
        </Link>{' '}
        par transaction réussie. Sur un paiement d'1 €, c'est plus de 25% de
        perdu. factAE définit donc un minimum de 12 mois (12 €) pour limiter les
        coûts liés aux transactions.
      </Typography>
    </Fragment>
  )
}

export default injectStripe(CheckoutForm)
