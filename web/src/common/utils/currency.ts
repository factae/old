import _ from 'lodash/fp'

export function toEuro(amount: string | number | null | undefined) {
  if (_.isNil(amount)) return ''

  const intl = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  })

  return intl.format(Number(amount)).replace(/\u202F/g, ' ')
}
