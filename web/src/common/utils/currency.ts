import _ from 'lodash/fp'

export function toEuro(amount: string | number | null | undefined) {
  if (_.isNil(amount)) return ''

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(amount))
}
