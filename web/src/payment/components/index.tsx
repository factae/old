import React, {useEffect, useState} from 'react'
import {StripeProvider, Elements} from 'react-stripe-elements'

import InjectedCheckoutForm from './CheckoutForm'

export default function() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stripeElement = document.createElement('script')
    stripeElement.onload = () => setReady(true)
    document.body.appendChild(stripeElement)
    stripeElement.src = 'https://js.stripe.com/v3/'

    return () => {
      document.body.removeChild(stripeElement)
    }
  }, [])

  return ready ? (
    <StripeProvider apiKey={String(process.env.REACT_APP_STRIPE_API_KEY)}>
      <Elements locale="fr">
        <InjectedCheckoutForm />
      </Elements>
    </StripeProvider>
  ) : null
}
