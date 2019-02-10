import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import passport from 'passport'

const isProduction = process.env.NODE_ENV === 'production'

export function bodyParserMiddleware() {
  return bodyParser.json()
}

export function cookieParserMiddleware() {
  return cookieParser()
}

export function corsMiddleware() {
  const origin = isProduction
    ? 'https://factae.soywod.me'
    : 'http://localhost:3000'

  return cors({origin, credentials: true})
}

export function passportMiddleware() {
  return passport.initialize()
}

export default [
  bodyParserMiddleware(),
  cookieParserMiddleware(),
  corsMiddleware(),
  passportMiddleware(),
]
