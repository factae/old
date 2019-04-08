import express from 'express'

import {handle} from './handler'
import middlewares from './middlewares'
import * as auth from './auth'
import * as client from './client/controller'
import * as quotation from './quotation/controller'
import * as invoice from './invoice/controller'
import * as user from './user/controller'
import * as payment from './payment/controller'
import {authByLoginPassword} from './strategies/Local'
import {authByCookie} from './strategies/Cookie'

const URL = String(process.env.API_URL || 'http://localhost')
const PORT = Number(process.env.API_PORT || 3001)

// --------------------------------------------------------------------- # API #

const api = express()

api.enable('trust proxy')
api.use(...middlewares)

// Auth
api.post('/register', handle(auth.register))
api.post('/login', authByLoginPassword, handle(auth.login))

// Client
api.get('/client', authByCookie, handle(client.readAll))
api.post('/client', authByCookie, handle(client.create))
api.put('/client', authByCookie, handle(client.update))

// Quotation
api.get('/quotation', authByCookie, handle(quotation.readAll))
api.post('/quotation', authByCookie, handle(quotation.create))
api.put('/quotation', authByCookie, handle(quotation.update))

// Invoice
api.get('/invoice', authByCookie, handle(invoice.readAll))
api.post('/invoice', authByCookie, handle(invoice.create))
api.put('/invoice', authByCookie, handle(invoice.update))

// User
api.get('/user', authByCookie, handle(user.read))
api.post('/user', authByCookie, handle(user.update))
api.get('/confirm/:token', handle(user.confirm))

// Payment
api.post('/payment', authByCookie, handle(payment.charge))

// ----------------------------------------------------------------- # Exports #

export function start() {
  api.listen(PORT, () => {
    const env = process.env.NODE_ENV || ''
    console.log(`[${env.toUpperCase()}] factAE API started at ${URL}:${PORT}`)
  })
}

export function handleError(error: Error) {
  console.error('Error while starting API')
  console.error(error)

  process.exit(1)
}
