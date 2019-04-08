import {Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import passport, {AuthenticateOptions} from 'passport'
import {Strategy, IStrategyOptions, VerifyFunction} from 'passport-local'
import {getRepository} from 'typeorm'

import {User} from '../user/model'

const badCredentials = new Error(`identifiants invalides`)
const emailNotActivated = new Error(`email en attente d'activation`)

// ---------------------------------------------------------------- # Strategy #

const options: IStrategyOptions = {usernameField: 'email'}
const verify: VerifyFunction = async (email, password, done) => {
  try {
    const $user = await getRepository(User)
    const user = await $user.findOne({email})

    if (!user) return done(badCredentials)
    if (!user.emailConfirmed) return done(emailNotActivated)

    const passwordsMatch = bcrypt.compareSync(password, user.password)
    if (!passwordsMatch) return done(badCredentials)

    done(null, user)
  } catch (error) {
    done(error)
  }
}

const strategy = new Strategy(options, verify)

passport.use(strategy)

// -------------------------------------------------------------- # Middleware #

export function authByCredentials(req: Request, res: Response, next: Function) {
  const options: AuthenticateOptions = {session: false}
  const validate = (error: Error, user: User) => {
    if (error) return res.status(401).send(error.message)
    if (!user) return res.status(401).send(badCredentials.message)

    req.user = user
    next()
  }

  passport.authenticate('local', options, validate)(req, res, next)
}
