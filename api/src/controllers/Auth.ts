import {Request, Response, CookieOptions} from 'express'
import {getManager} from 'typeorm'
import {DateTime} from 'luxon'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import isByteLength from 'validator/lib/isByteLength'

import {User} from '../models/User'

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
    res.status(400).send('Invalid email')
  }

  if (!isByteLength(password, {min: 6})) {
    res.status(400).send('Invalid password length (min: 6)')
  }

  const hash = bcrypt.hashSync(password)
  await getManager().insert(User, {email, password: hash})

  res.sendStatus(204)
}

// ------------------------------------------------------------------- # Utils #

function generateToken(data: any) {
  return jwt.sign({}, SECRET, {
    subject: String(data),
    issuer: 'FactAE',
    algorithm: 'HS512',
    expiresIn: EXPIRY_TIME,
  })
}
