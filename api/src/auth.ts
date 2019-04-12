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
  const {email} = req.body

  if (!isEmail(email)) {
    res.status(400).send(`email invalide`)
  }

  const $user = await getRepository(User)
  const token = uuid()
  const url = `${WEB_URL}/password/${token}`

  try {
    await $user.insert({
      email,
      token,
      quotationConditions: '- Type de paiement : virement bancaire',
      invoiceConditions: '- Paiement comptant à réception de la facture',
    })
  } catch (error) {
    switch (error.code) {
      case 'ER_DUP_ENTRY':
        return res.status(400).send(`un compte existe déjà avec ce mail`)
      default:
        console.error(error.message)
        return res.status(500).send(`échec ajout nouvel utilisateur`)
    }
  }

  try {
    await mail.send({
      to: email,
      subject: '[factAE] - Bienvenue !',
      template: {
        name: 'confirm-user',
        data: {url},
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
  const authToken = jwt.sign({}, String(process.env.API_SECRET), {
    subject: String(req.user.id),
    issuer: 'factAE',
    algorithm: 'HS512',
    expiresIn: EXPIRY_TIME,
  })

  res.cookie('token', authToken, cookieOptions({expires})).sendStatus(204)
}

// ------------------------------------------------------------ # Set password #

export async function password(req: Request, res: Response) {
  const {token, password} = req.body
  const $user = await getRepository(User)

  if (!isByteLength(password, {min: 6})) {
    res.status(400).send(`mot de passe invalide (6 caractères min.)`)
  }

  try {
    const user = await $user.findOne({token})
    if (!user) return res.status(400).send(`token invalide`)

    req.user = await $user.save({
      ...user,
      token: null,
      active: true,
      password: bcrypt.hashSync(password),
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).send(`échec mise à jour mot de passe`)
  }

  return await login(req, res)
}

// ---------------------------------------------------------- # Reset password #

export async function reset(req: Request, res: Response) {
  const {email} = req.body

  if (!isEmail(email)) {
    res.status(400).send(`email invalide`)
  }

  const $user = await getRepository(User)
  const token = uuid()
  const url = `${WEB_URL}/password/${token}`

  try {
    const user = await $user.findOne({email})
    if (!user) return res.status(400).send(`email inconnu`)

    await $user.save({...user, token, active: false})
  } catch (error) {
    console.error(error.message)
    return res.status(500).send(`échec réinitialisation mot de passe`)
  }

  try {
    await mail.send({
      to: email,
      subject: `[factAE] - Mot de passe oublié`,
      template: {
        name: 'reset-password',
        data: {url},
      },
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).send(`échec envoi mail d'activation`)
  }

  res.sendStatus(204)
}

// ------------------------------------------------------------------- # Check #

export async function check(_req: Request, res: Response) {
  res.sendStatus(204)
}

// ------------------------------------------------------------------ # Logout #

export async function logout(_req: Request, res: Response) {
  const expires = DateTime.fromISO('1990-02-02').toJSDate()
  res.cookie('token', '', cookieOptions({expires})).sendStatus(204)
}

// ------------------------------------------------------------------- # Utils #

function cookieOptions(options: CookieOptions) {
  return process.env.NODE_ENV === 'production'
    ? {httpOnly: true, secure: true, domain: 'factae.fr', ...options}
    : {httpOnly: true, secure: false, ...options}
}
