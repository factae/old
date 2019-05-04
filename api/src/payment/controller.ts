import {Request, Response} from 'express'
import {DateTime} from 'luxon'
import Stripe from 'stripe'
import {getRepository} from 'typeorm'

import {User} from '../user/model'

const stripe = new Stripe(String(process.env.STRIPE_API_KEY))

// -------------------------------------------------------------------- # Charge #

export async function charge(req: Request, res: Response) {
  const $user = await getRepository(User)
  const transaction = await stripe.charges.create({
    amount: 1200,
    currency: 'EUR',
    description: 'Example charge',
    receipt_email: req.user.email,
    source: req.body.token,
  })

  if (!transaction.paid) {
    res.status(400).send(transaction.failure_message)
  }

  const createdAt = DateTime.fromSeconds(transaction.created)
  const {expiresAt} = await $user.save({
    ...req.user,
    expiresAt: createdAt.plus({months: 12}).toISO(),
  })

  res.status(200).send(expiresAt)
}
