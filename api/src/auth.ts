import {Request, Response, CookieOptions} from 'express'
import {getRepository} from 'typeorm'
import {DateTime} from 'luxon'
import bcrypt from 'bcryptjs'
import uuid from 'uuid/v4'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import isByteLength from 'validator/lib/isByteLength'

import * as mail from './mail'
import {User} from './user/model'

const WEB_URL = `${process.env.WEB_URL}:${process.env.WEB_PORT}`
const EXPIRY_TIME = 60 * 60 * 24 // 24h

// ---------------------------------------------------------------- # Register #

export async function register(req: Request, res: Response) {
  const {email, password} = req.body
  const $user = await getRepository(User)
  const hash = bcrypt.hashSync(password)
  const token = uuid()
  const confirmUrl = `${WEB_URL}/confirm/${token}`

  if (!isEmail(email)) {
    res.status(400).send(`email invalide`)
  }

  if (!isByteLength(password, {min: 6})) {
    res.status(400).send(`mot de passe invalide (6 caractères min.)`)
  }

  try {
    await $user.insert({
      email,
      token,
      password: hash,
      quotationConditions: '- Type de paiement : virement bancaire',
      invoiceConditions: '- Paiement comptant à réception de la facture',
    })
  } catch (error) {
    switch (error.code) {
      case 'ER_DUP_ENTRY':
        return res.status(400).send(`email déjà pris`)
      default:
        console.error(error.message)
        return res.status(500).send(`échec ajout nouvel utilisateur`)
    }
  }

  try {
    await mail.send({
      to: email,
      subject: 'Bienvenue sur factAE',
      template: {
        name: 'confirm-user',
        data: {url: confirmUrl},
      },
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).send(`échec envoi mail d'activation`)
  }

  res.sendStatus(204)
}

// ------------------------------------------------------------------- # Login #

export async function login(req: Request, res: Response) {
  const expiry = DateTime.utc().plus({seconds: EXPIRY_TIME})
  const expires = expiry.toJSDate()
  const authToken = generateToken(req.user.id, process.env.API_SECRET)
  const expiryToken = generateToken(expiry.toMillis())

  res
    .cookie('token', authToken, cookieOptions({expires}))
    .cookie('expiry', expiryToken, cookieOptions({expires, httpOnly: false}))
    .sendStatus(204)
}

// ------------------------------------------------------------------- # Check #

export async function check(_req: Request, res: Response) {
  res.sendStatus(204)
}

// ------------------------------------------------------------------ # Logout #

export async function logout(_req: Request, res: Response) {
  const expires = DateTime.fromISO('1990-02-02').toJSDate()

  res
    .cookie('token', '', cookieOptions({expires}))
    .cookie('expiry', '', cookieOptions({expires, httpOnly: false}))
    .sendStatus(204)
}

// ------------------------------------------------------------------- # Utils #

function cookieOptions(options: CookieOptions) {
  return process.env.NODE_ENV === 'production'
    ? {httpOnly: true, secure: true, domain: 'factae.fr', ...options}
    : {httpOnly: true, secure: false, ...options}
}

function generateToken(data: any, secret?: string) {
  return jwt.sign({}, secret || 'factAE', {
    subject: String(data),
    issuer: 'factAE',
    algorithm: 'HS512',
    expiresIn: EXPIRY_TIME,
  })
}
