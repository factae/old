import _ from 'lodash/fp'

import {getUserFullName, getUserName} from '../user/model'

export interface Client {
  id: number
  firstName: string
  lastName: string
  tradingName: string | null
  address: string
  zip: string
  city: string
  country: string
  email: string
  phone: string
  siret: string | null
}

export {getUserName as getClientName}
export {getUserFullName as getClientFullName}

export const emptyClient: Client = {
  id: -1,
  firstName: '',
  lastName: '',
  tradingName: null,
  address: '',
  zip: '',
  city: '',
  country: 'France',
  email: '',
  phone: '',
  siret: null,
}
