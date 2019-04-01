export interface Client {
  id: number
  firstName: string
  lastName: string
  tradingName: string | null
  address: string
  zip: number
  city: string
  email: string
  phone: string
  siren: string | null
}

export const emptyClient: Client = {
  id: -1,
  firstName: '',
  lastName: '',
  tradingName: null,
  address: '',
  zip: 0,
  city: '',
  email: '',
  phone: '',
  siren: null,
}
