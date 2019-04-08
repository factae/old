import {Request, Response} from 'express'
import {getRepository} from 'typeorm'
import {DateTime} from 'luxon'
import Stripe from 'stripe'

import {User} from '../user/model'

const stripe = new Stripe(String(process.env.STRIPE_API_KEY))

// -------------------------------------------------------------------- # Charge #

function getAmount(plan: number) {
  switch (plan) {
    case 1:
      return 200
    case 3:
      return 500
    case 6:
      return 1000
    case 12:
      return 2000
    default:
      throw new Error('invalid plan')
  }
}

export async function charge(req: Request, res: Response) {
  const $user = await getRepository(User)
  const transaction = await stripe.charges.create({
    amount: getAmount(req.body.plan),
    currency: 'EUR',
    description: 'Example charge',
    source: req.body.token,
    receipt_email: req.user.email,
  })

  if (!transaction.paid) {
    res.status(400).send(transaction.failure_message)
  }

  const createdAt = DateTime.fromSeconds(transaction.created)
  const {premium} = await $user.save({
    ...req.user,
    premium: createdAt.plus({months: req.body.plan}).toISO(),
  })

  res.status(200).send(premium)
}
