export interface ContractItem {
  id: number
  position: number
  description: string
  unitPrice: number | null
  quantity: number | null
  total: number | null
}

export function emptyItem(unitPrice: number | null): ContractItem {
  return {
    id: -1,
    position: 0,
    description: '',
    unitPrice: unitPrice || null,
    quantity: 1,
    total: null,
  }
}
