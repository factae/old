import {useEffect, useRef} from 'react'
import jwt from 'jsonwebtoken'
import _ from 'lodash/fp'
import {DateTime} from 'luxon'

type Cookies = {[key: string]: string}
type Token = string | {sub?: string}

// ------------------------------------------------------------------- # Utils #

function parseCookiesStr(cookiesStr: string): Cookies {
  function splitByEqual(cookieStr: string) {
    const [key, ...val] = _.split('=')(cookieStr)
    return [key, _.first(val)]
  }

  return _.pipe([_.split(';'), _.map(splitByEqual), _.fromPairs])(cookiesStr)
}

function parseExpiry(rawCookies: string) {
  try {
    const cookies = parseCookiesStr(rawCookies)
    const token: Token = jwt.verify(cookies.expiry, 'factAE', {
      algorithms: ['HS512'],
      issuer: 'factAE',
    })

    return DateTime.fromMillis(Number(token.sub)).toUTC()
  } catch (error) {
    console.debug(error.message)
    return DateTime.utc()
  }
}
// -------------------------------------------------------------------- # Hooks #

export function isAuth() {
  return parseExpiry(document.cookie) > DateTime.utc()
}

export function useLogout() {
  const clearCookie = useRef<() => void>(_.noop)

  useEffect(() => {
    clearCookie.current = () => {
      const expires = DateTime.fromISO('1990-02-02').toHTTP()
      document.cookie = `expiry=;expires=${expires}`
      window.location.href = '/login'
    }
  }, [])

  return clearCookie.current
}
