export enum RateUnit {
  hour = 1,
  day = 2,
  service = 3,
}

export interface User {
  id: number
  email: string
  password: string
  tradingName: string | null
  firstName: string
  lastName: string
  address: string
  zip: number
  city: string
  phone: string
  rib: string
  iban: string
  bic: string
  siren: string
  apeCode: string
  taxId: string | null
  taxRate: number | null
  quotationConditions: string | null
  invoiceConditions: string | null
  rate: number | null
  rateUnit: RateUnit
}

export type PartialUser = Pick<User, 'email' | 'password'>

export function emptyUser(): PartialUser {
  return {
    email: '',
    password: '',
  }
}
