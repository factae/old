import {DateTime} from 'luxon'

interface Quotation {
  id: number
  userId: number
  number: string
  deposit: number | null
  total: number
  taxeRate: number
  createdAt: DateTime
  expiresAt: DateTime
  signedAt: DateTime | null
}

export default Quotation
