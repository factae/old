import React, {FormEvent, useRef, useState} from 'react'
import {CardElement, ReactStripeElements} from 'react-stripe-elements'
import {injectStripe} from 'react-stripe-elements'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import get from 'lodash/get'
import isNil from 'lodash/isNil'

import * as date from '../../common/utils/date'
import {post} from '../../common/utils/axios'
import useAsyncContext from '../../async/context'
import useUserContext from '../../user/context'
import usePaymentContext from '../context'

import {useStyles} from './styles'

function CheckoutForm({stripe}: ReactStripeElements.InjectedStripeProps) {
  const [user, setUser] = useUserContext()
  const async = useAsyncContext()
  const {open, closePaymentDialog} = usePaymentContext()
  const [plan, setLocalPlan] = useState('1')
  const formRef = useRef<HTMLFormElement | null>(null)
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

      await setUser({...user, premium: date.from(paymentRes.data)})
      closePaymentDialog()
      async.stop('Paiement validé.')
    } catch (error) {
      console.debug(error.toString())
      async.stop('Erreur lors de paiement !')
    }
  }

  return (
    <Dialog open={open} onClose={closePaymentDialog}>
      <DialogTitle>Abonnement Premium requis</DialogTitle>

      <DialogContent>
        <form ref={formRef} onSubmit={charge}>
          Le compte Premium vous donne accès à toutes les fonctionnalités de
          factAE, ainsi qu'à toutes les nouvelles fonctionnalités à venir.
          Choisissez la durée de votre abonnement :
          <RadioGroup
            name="plan"
            value={plan}
            onChange={setPlan}
            className={classes.plan}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="1 mois (2€)"
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="3 mois (5€)"
            />
            <FormControlLabel
              value="6"
              control={<Radio />}
              label="6 mois (10€)"
            />
            <FormControlLabel
              value="12"
              control={<Radio />}
              label="12 mois (20 €)"
            />
          </RadioGroup>
          <CardElement className={classes.input} />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={closePaymentDialog} color="secondary">
          Annuler
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={charge}
        >
          Payer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default injectStripe(CheckoutForm)
