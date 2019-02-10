import React from 'react'
import jwt from 'jsonwebtoken'
import flow from 'lodash/fp/flow'
import fromPairs from 'lodash/fp/fromPairs'
import head from 'lodash/fp/head'
import map from 'lodash/fp/map'
import split from 'lodash/fp/split'
import {DateTime} from 'luxon'

type Token = string | {sub?: string}

const SECRET = process.env.REACT_APP_SECRET || 'secret'

// ------------------------------------------------------------------- # Utils #

function parseCookiesStr(cookiesStr: string) {
  function splitByEqual(cookieStr: string) {
    const [key, ...val] = split('=')(cookieStr)
    return [key, head(val)]
  }

  return flow(
    split(';'),
    map(splitByEqual),
    fromPairs,
  )(cookiesStr)
}

function parseExpiry(cookiesStr: string) {
  try {
    const cookies = parseCookiesStr(cookiesStr)
    const token: Token = jwt.verify(cookies.expiry, SECRET, {
      algorithms: ['HS512'],
      issuer: 'FactAE',
    })

    return DateTime.fromMillis(Number(token.sub)).toUTC()
  } catch (error) {
    console.error(error.message)
    return DateTime.utc()
  }
}
// -------------------------------------------------------------------- # Hook #

export default function(cookiesStr: string) {
  const expiry = React.useRef(parseExpiry(cookiesStr))

  React.useEffect(() => {
    expiry.current = parseExpiry(cookiesStr)
  }, [cookiesStr])

  return expiry.current > DateTime.utc()
}
