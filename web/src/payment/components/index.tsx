import React, {useState} from 'react'
import {StripeProvider, Elements} from 'react-stripe-elements'

import InjectedCheckoutForm from './CheckoutForm'

export default function() {
  const [ready, setLocalReady] = useState(false)

  function setReady() {
    setLocalReady(true)
  }

  return ready ? (
    <StripeProvider apiKey={String(process.env.REACT_APP_STRIPE_API_KEY)}>
      <Elements locale="fr">
        <InjectedCheckoutForm />
      </Elements>
    </StripeProvider>
  ) : (
    <script src="https://js.stripe.com/v3/" onLoad={setReady} />
  )
}
