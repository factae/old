export interface Client {
  id: number
  firstName: string
  lastName: string
  address: string
  zip: number
  city: string
  email: string
  phone: string
  tvaNumber: string | null
}

export const emptyClient: Client = {
  id: -1,
  firstName: '',
  lastName: '',
  address: '',
  zip: 0,
  city: '',
  email: '',
  phone: '',
  tvaNumber: '',
}
