/* interface ContractItem { */
/*   id: number */
/*   quotationId: number | null */
/*   invoiceId: number | null */
/*   date: DateTime */
/*   designation: string */
/*   reference: string */
/*   unitPrice: number */
/*   quantity: number */
/*   total: number */
/* } */

export interface ContractItem {
  id: number
  description: string
  unitPrice: number
  quantity: number
  total: number
}

export function emptyItem(unitPrice: number | null): ContractItem {
  return {
    id: -1,
    description: '',
    unitPrice: unitPrice || 0,
    quantity: 1,
    total: 0,
  }
}
