import React, {Fragment, FormEvent, useState} from 'react'
import {DateTime} from 'luxon'
import {CardElement, ReactStripeElements} from 'react-stripe-elements'
import {injectStripe} from 'react-stripe-elements'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import IconSecure from '@material-ui/icons/Lock'
import IconSafe from '@material-ui/icons/Security'
import get from 'lodash/get'
import isNil from 'lodash/isNil'

import Link from '../../common/components/Link'
import {post} from '../../common/utils/axios'
import useAsyncContext from '../../async/context'
import useUserContext from '../../user/context'

import {useStyles} from './styles'

function CheckoutForm({stripe}: ReactStripeElements.InjectedStripeProps) {
  const [user, setUser] = useUserContext()
  const async = useAsyncContext()
  const [plan, setLocalPlan] = useState('3')
  const classes = useStyles()

  function setPlan(_e: any, value: string) {
    setLocalPlan(value)
  }

  async function charge(event?: FormEvent) {
    if (event) event.preventDefault()
    if (isNil(stripe)) return
    if (isNil(user)) return

    async.start()

    try {
      const name = `${user.firstName} ${user.lastName}`
      const tokenRes = await stripe.createToken({name})
      const token = get(tokenRes, 'token.id', null)
      const paymentRes = await post('/payment', {token, plan: Number(plan)})

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
        Votre abonnement est arrivé à échéance. Veuillez choisir une offre :
      </Typography>

      <form className={classes.form} onSubmit={charge}>
        <RadioGroup
          name="plan"
          value={plan}
          onChange={setPlan}
          className={classes.plan}
        >
          <FormControlLabel value="3" control={<Radio />} label="3 mois (3€)" />
          <FormControlLabel
            value="6"
            control={<Radio />}
            label="6 mois (5,50 €)"
          />
          <FormControlLabel
            value="12"
            control={<Radio />}
            label="12 mois (11€)"
          />
        </RadioGroup>

        <Grid container spacing={16}>
          <Grid item xs={12} sm={10}>
            <CardElement className={classes.input} hidePostalCode />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              type="submit"
              color="secondary"
              variant="outlined"
              onClick={charge}
              className={classes.pay}
            >
              <IconSecure className={classes.icon} fontSize="small" />
              Payer
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
        Pourquoi je ne peux pas choisir un mois seulement ?
      </Typography>

      <Typography gutterBottom variant="body1">
        <Link to="https://stripe.com/">Stripe</Link>, la solution de paiement en
        ligne utilisée par factAE,{' '}
        <Link to="https://stripe.com/fr-FR/pricing">
          prélève 1,4% + 25 centimes
        </Link>{' '}
        par transaction réussie. Sur un paiement d'1 €, c'est plus de 25% de
        perdu. factAE définit donc un minimum de 3 mois (3 €) pour limiter les
        coûts liés aux transactions.
      </Typography>
    </Fragment>
  )
}

export default injectStripe(CheckoutForm)
