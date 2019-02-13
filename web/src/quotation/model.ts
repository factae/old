import {DateTime} from 'luxon'

import ContractItem from '../contractItem/model'

interface Quotation {
  id: number
  userId: number
  clientId: number
  number: string
  deposit: number | null
  total: number
  taxRate: number
  items: ContractItem[]
  createdAt: DateTime
  expiresAt: DateTime
  signedAt: DateTime | null
}

export default Quotation
