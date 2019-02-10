import {DateTime} from 'luxon'

interface Invoice {
  id: number
  userId: number
  quotationId: number | null
  number: string
  deposit: string | null
  total: number
  taxeRate: number
  createdAt: DateTime
  expiresAt: DateTime
  paidAt: DateTime | null
}

export default Invoice
