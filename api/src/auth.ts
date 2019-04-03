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
const SECRET = process.env.API_SECRET || 'secret'
const EXPIRY_TIME = 60 * 60 * 24 // 24h

// ------------------------------------------------------------------- # Login #

function cookieOptions(options: CookieOptions) {
  return process.env.NODE_ENV === 'production'
    ? {httpOnly: true, secure: true, domain: 'soywod.me', ...options}
    : {httpOnly: true, secure: false, ...options}
}

export async function login(req: Request, res: Response) {
  const expiry = DateTime.utc().plus({seconds: EXPIRY_TIME})
  const expires = expiry.toJSDate()
  const authToken = generateToken(req.user.id)
  const expiryToken = generateToken(expiry.toMillis())

  res
    .cookie('token', authToken, cookieOptions({expires}))
    .cookie('expiry', expiryToken, cookieOptions({expires, httpOnly: false}))
    .sendStatus(204)
}

// ---------------------------------------------------------------- # Register #

export async function register(req: Request, res: Response) {
  const {email, password} = req.body

  if (!isEmail(email)) {
    res.status(400).send('email invalide')
  }

  if (!isByteLength(password, {min: 6})) {
    res.status(400).send('mot de passe invalide (6 caractères min.)')
  }

  const $user = getRepository(User)
  const hash = bcrypt.hashSync(password)
  const token = uuid()
  const confirmUrl = `${WEB_URL}/confirm/${token}`

  $user.insert({
    email,
    token,
    password: hash,
    quotationConditions: '- Type de paiement : virement bancaire',
    invoiceConditions: '- Paiement comptant à réception de la facture',
  })

  mail.send({
    to: email,
    subject: 'Bienvenue sur factAE !',
    html: `Merci de bien vouloir confirmer votre email en cliquant sur le lien suivant : <a href="${confirmUrl}">${confirmUrl}</a>`,
  })

  res.sendStatus(204)
}

// ------------------------------------------------------------------- # Utils #

function generateToken(data: any) {
  return jwt.sign({}, SECRET, {
    subject: String(data),
    issuer: 'factAE',
    algorithm: 'HS512',
    expiresIn: EXPIRY_TIME,
  })
}
