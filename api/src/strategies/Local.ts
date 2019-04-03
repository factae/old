import {Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import passport, {AuthenticateOptions} from 'passport'
import {Strategy, IStrategyOptions, VerifyFunction} from 'passport-local'
import {getConnection} from 'typeorm'

import {User} from '../user/model'

// ---------------------------------------------------------- # Local strategy #

const options: IStrategyOptions = {usernameField: 'email'}
const verify: VerifyFunction = async (email, password, done) => {
  try {
    const $user = await getConnection().getRepository(User)
    const user = await $user.findOneOrFail({email, emailConfirmed: true})
    const passwordsMatch = bcrypt.compareSync(password, user.password)

    done(null, passwordsMatch ? user : false)
  } catch (error) {
    switch (error.name) {
      case 'EntityNotFound':
        return done(null, false)
      default:
        return done(error)
    }
  }
}

const localStrategy = new Strategy(options, verify)

passport.use(localStrategy)

// -------------------------------------------------------------- # Middleware #

export function authByLoginPassword(
  req: Request,
  res: Response,
  next: Function,
) {
  const options: AuthenticateOptions = {session: false}
  const validate = (error: Error, user: User) => {
    if (error) return next(error)
    if (!user) return res.sendStatus(403)
    req.user = user
    next()
  }

  passport.authenticate('local', options, validate)(req, res, next)
}
