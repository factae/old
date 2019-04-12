import {Request, Response} from 'express'
import passport, {AuthenticateOptions} from 'passport'
import {ExtractJwt} from 'passport-jwt'
import {Strategy, StrategyOptions, VerifyCallback} from 'passport-jwt'
import {getRepository} from 'typeorm'

import {User} from '../user/model'

const authFailed = new Error(`échec de l'autentification`)

// ---------------------------------------------------------------- # Strategy #

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([req => req.cookies.token]),
  secretOrKey: process.env.API_SECRET || 'secret',
  issuer: 'factAE',
}

const verify: VerifyCallback = async (payload, done) => {
  try {
    const id = Number(payload.sub)
    const $user = await getRepository(User)
    const user = await $user.findOne({id})

    if (!user) return done(authFailed)
    if (!user.active) return done(authFailed)

    done(null, user)
  } catch (error) {
    done(error)
  }
}

const strategy = new Strategy(options, verify)

passport.use(strategy)

// -------------------------------------------------------------- # Middleware #

export function authByCookie(req: Request, res: Response, next: Function) {
  const options: AuthenticateOptions = {session: false}
  const validate = (error: Error, user: User) => {
    if (error) return res.status(401).send(error.message)
    if (!user) return res.status(401).send(authFailed.message)

    req.user = user
    next()
  }

  passport.authenticate('jwt', options, validate)(req, res, next)
}
