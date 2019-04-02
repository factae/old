import {Request, Response} from 'express'
import passport, {AuthenticateOptions} from 'passport'
import {ExtractJwt} from 'passport-jwt'
import {Strategy, StrategyOptions, VerifyCallback} from 'passport-jwt'
import {getConnection} from 'typeorm'

import {User} from '../user/model'

// --------------------------------------------------------- # Cookie strategy #

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([req => req.cookies.token]),
  secretOrKey: process.env.API_SECRET || 'secret',
  issuer: 'factAE',
}

const verify: VerifyCallback = async (payload, done) => {
  try {
    const id = Number(payload.sub)
    const userRepository = await getConnection().getRepository(User)
    const user = await userRepository.findOneOrFail({id})

    return done(null, user)
  } catch (error) {
    switch (error.name) {
      case 'EntityNotFound':
        return done(null, false)

      default:
        return done(error)
    }
  }
}

const cookieStrategy = new Strategy(options, verify)

passport.use(cookieStrategy)

// -------------------------------------------------------------- # Middleware #

export function authByCookie(req: Request, res: Response, next: Function) {
  const options: AuthenticateOptions = {session: false}
  const validate = (error: Error, user: User) => {
    if (error) return next(error)
    if (!user) return res.sendStatus(403)
    req.user = user
    next()
  }

  passport.authenticate('jwt', options, validate)(req, res, next)
}
