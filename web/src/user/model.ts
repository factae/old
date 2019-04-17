import _ from 'lodash/fp'

import {Client} from '../client/model'

export enum RateUnit {
  hour = 1,
  day = 2,
  service = 3,
}

export enum Activity {
  trade = 1,
  service = 2,
}

export interface User {
  id: number
  email: string
  password: string
  tradingName: string | null
  firstName: string
  lastName: string
  address: string
  zip: string
  city: string
  phone: string
  rib: string
  iban: string
  bic: string
  siren: string
  apeCode: string
  taxId: string | null
  taxRate: number | null
  documentAutoSend: boolean
  quotationConditions: string | null
  invoiceConditions: string | null
  rate: number | null
  rateUnit: RateUnit | null
  activity: Activity | null
  expiresAt: string | null
  step: number
  ready: boolean
}

export type PartialUser = Pick<User, 'email' | 'password'>

function formatFirstName(firstName: string) {
  return _.pipe([_.trim, _.startCase, _.defaultTo('')])(firstName)
}

function formatLastName(lastName: string) {
  return _.pipe([_.trim, _.upperCase, _.defaultTo('')])(lastName)
}

function formatTradingName(tradingName: string) {
  return _.pipe([_.trim, _.capitalize, _.defaultTo('')])(tradingName)
}

export function getUserName(user: User | Client) {
  if (user.tradingName) {
    return formatTradingName(user.tradingName)
  }

  const firstName = formatFirstName(user.firstName)
  const lastName = formatLastName(user.lastName)

  return _.trim(`${firstName} ${lastName}`)
}

export function getUserFullName(user: User | Client) {
  const firstName = formatFirstName(user.firstName)
  const lastName = formatLastName(user.lastName)
  const fullName = _.trim(`${firstName} ${lastName}`)

  if (user.tradingName) {
    const tradingName = formatTradingName(user.tradingName)
    return `${tradingName} (${fullName})`
  } else {
    return fullName
  }
}

export function emptyUser(): PartialUser {
  return {
    email: '',
    password: '',
  }
}
