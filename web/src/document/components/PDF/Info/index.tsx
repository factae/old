import React from 'react'
import {DateTime} from 'luxon'
import {View, Text} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'
import _ from 'lodash/fp'

import {toEuro} from '../../../../common/utils/currency'
import {RateUnit} from '../../../../user/model'
import {isQuotation} from '../../../../quotation/model'
import {isInvoice} from '../../../../invoice/model'
import {isCredit} from '../../../../credit/model'
import {Document} from '../../../model'

import useStyle from './styles'

type Props = {
  theme: Theme
  document: Document
}

export default function({theme, document}: Props) {
  const styles = useStyle(theme)

  function renderRateLabel() {
    if (!isQuotation(document)) return ''

    switch (document.rateUnit) {
      case RateUnit.day:
        return 'Taux journalier'

      case RateUnit.hour:
        return 'Taux horaire'

      case RateUnit.service:
        return 'Taux forfaitaire'

      default:
        return ''
    }
  }

  function renderInfos() {
    function format(date: string | null) {
      if (_.isNull(date)) return ''
      return DateTime.fromISO(date).toFormat('dd/LL/yyyy')
    }

    if (isQuotation(document)) {
      const infos: {[key: string]: string} = {
        'Devis n°': document.number,
        'Date émission': format(document.createdAt),
        "Date d'expiration": format(document.expiresAt),
        'Début prestation': format(document.startsAt),
        'Fin prestation': format(document.endsAt),
      }

      if (!_.isNull(document.rate)) {
        infos[renderRateLabel()] = toEuro(document.rate)
      }

      return infos
    }

    if (isInvoice(document)) {
      const infos: {[key: string]: string} = {
        'Facture n°': document.number,
        'Date émission': format(document.createdAt),
      }

      return infos
    }

    if (isCredit(document)) {
      const infos: {[key: string]: string} = {
        "Facture d'avoir n°": document.number,
        'Date émission': format(document.createdAt),
      }

      return infos
    }

    return {}
  }

  const infos = renderInfos()

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.section}>
          {_.keys(infos).map(title => (
            <Text key={title} style={styles.title}>
              {title}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          {_.values(infos).map((item, key) => (
            <Text key={key} style={styles.item}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    </View>
  )
}
