import express from 'express'

import {handle} from './handler'
import middlewares from './middlewares'
import * as auth from './auth'
import * as client from './client/controller'
import * as document from './document/controller'
import * as user from './user/controller'
import * as payment from './payment/controller'
import {authByCredentials} from './strategies/Local'
import {authByCookie} from './strategies/Cookie'

const URL = String(process.env.API_URL || 'http://localhost')
const PORT = Number(process.env.API_PORT || 3001)

// --------------------------------------------------------------------- # API #

const api = express()

api.enable('trust proxy')
api.use(...middlewares)

// Auth
api.post('/register', auth.register)
api.put('/login', authByCredentials, auth.login)
api.put('/password', auth.password)
api.put('/reset', auth.reset)
api.get('/check', authByCookie, auth.check)
api.put('/logout', authByCookie, auth.logout)

// Client
api.get('/client', authByCookie, handle(client.readAll))
api.post('/client', authByCookie, handle(client.create))
api.put('/client', authByCookie, handle(client.update))

// Document
api.get('/document', authByCookie, handle(document.readAll))
api.post('/document', authByCookie, handle(document.create))
api.put('/document', authByCookie, handle(document.update))
api.delete('/document/:id', authByCookie, handle(document.delete))

// User
api.get('/user', authByCookie, handle(user.read))
api.post('/user', authByCookie, handle(user.update))

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
