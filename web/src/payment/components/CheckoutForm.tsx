import React, {Fragment, FormEvent, useState} from 'react'
import {CardElement, ReactStripeElements} from 'react-stripe-elements'
import {injectStripe} from 'react-stripe-elements'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import IconPay from '@material-ui/icons/EuroSymbol'
import IconSponsor from '@material-ui/icons/Send'
import get from 'lodash/get'
import isNil from 'lodash/isNil'

import {post} from '../../common/utils/axios'
import useAsyncContext from '../../async/context'
import useUserContext from '../../user/context'

import {useStyles} from './styles'

function CheckoutForm({stripe}: ReactStripeElements.InjectedStripeProps) {
  const [user, setUser] = useUserContext()
  const async = useAsyncContext()
  const [plan, setLocalPlan] = useState('1')
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

      await setUser({...user, expiresAt: paymentRes.data})
      async.stop('Paiement effectué. Merci pour votre achat !')
    } catch (error) {
      console.debug(error.toString())
      async.stop('Erreur lors de paiement !')
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
            label="6 mois (5.5€)"
          />
          <FormControlLabel
            value="12"
            control={<Radio />}
            label="12 mois (11€)"
          />
        </RadioGroup>

        <Grid container spacing={16}>
          <Grid item xs={9}>
            <CardElement className={classes.input} />
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              color="secondary"
              variant="outlined"
              onClick={charge}
              className={classes.pay}
            >
              <IconPay className={classes.icon} /> Payer
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography gutterBottom component="h2" variant="h5">
        Pourquoi je ne peux pas choisir un mois seulement ?
      </Typography>

      <Typography gutterBottom variant="body1">
        Stripe, la solution de paiement en ligne utilisée par factAE, prélève
        2.9% + 30 centimes par transaction réussie. De ce fait, il est
        indispensable d'amortir les coûts.
      </Typography>

      <br />

      <Typography gutterBottom component="h2" variant="h5">
        Vous pouvez également parrainer un proche
      </Typography>

      <Typography gutterBottom variant="body1">
        Pour chaque parrainage réussi, vous obtiendrez un mois gratuit :
      </Typography>

      <form className={classes.form}>
        <Grid container spacing={16}>
          <Grid item xs={9}>
            <TextField label="Email" variant="outlined" fullWidth disabled />
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              onClick={charge}
              className={classes.pay}
              disabled
            >
              <IconSponsor className={classes.icon} /> Inviter (bientôt)
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  )
}

export default injectStripe(CheckoutForm)
