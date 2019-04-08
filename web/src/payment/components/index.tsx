import React from 'react'
import {StripeProvider, Elements} from 'react-stripe-elements'

import InjectedCheckoutForm from './CheckoutForm'

export default function() {
  return (
    <StripeProvider apiKey={String(process.env.REACT_APP_STRIPE_API_KEY)}>
      <Elements locale="fr">
        <InjectedCheckoutForm />
      </Elements>
    </StripeProvider>
  )
}
