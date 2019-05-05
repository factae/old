import React, {Fragment} from 'react'
import isNull from 'lodash/isNull'
import {Text, View} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

import {toEuro} from '../../../../common/utils/currency'
import {Document} from '../../../model'

import useStyle from './styles'

type Props = {
  theme: Theme
  document: Document
}

export default function({theme, document}: Props) {
  const styles = useStyle(theme)

  function renderTaxRateRows() {
    if (isNull(document.taxRate)) {
      return null
    }

    return (
      <Fragment>
        <View style={styles.tr}>
          <Text
            style={{
              ...styles.td,
              ...styles.subTotal,
              ...styles.textMuted,
            }}
          >
            Total HT
          </Text>
          <Text style={{...styles.td, ...styles.textMuted}}>
            {toEuro(document.total)}
          </Text>
        </View>
        <View style={styles.tr}>
          <Text
            style={{
              ...styles.td,
              ...styles.subTotal,
              ...styles.textMuted,
            }}
          >
            Taux TVA
          </Text>
          <Text style={{...styles.td, ...styles.textMuted}}>
            {document.taxRate} %
          </Text>
        </View>
        <View style={styles.tr}>
          <Text
            style={{
              ...styles.td,
              ...styles.subTotal,
              ...styles.textMuted,
            }}
          >
            Montant TVA
          </Text>
          <Text style={{...styles.td, ...styles.textMuted}}>
            {toEuro(document.total * document.taxRate * 0.01)}
          </Text>
        </View>
      </Fragment>
    )
  }

  return (
    <View style={styles.table}>
      <View style={{...styles.tr, backgroundColor: theme.palette.grey[100]}}>
        <Text style={{...styles.th, ...styles.description}}>Désignation</Text>
        <Text style={styles.th}>Quantité</Text>
        <Text style={styles.th}>Prix unitaire HT</Text>
        <Text style={styles.th}>Montant HT</Text>
      </View>
      {document.items.map((item, key) => (
        <View key={key} style={styles.tr}>
          <Text style={{...styles.td, ...styles.description}}>
            {item.description}
          </Text>
          <Text style={styles.td}>{item.quantity}</Text>
          <Text style={styles.td}>{toEuro(item.unitPrice)}</Text>
          <Text style={styles.td}>{toEuro(item.total)}</Text>
        </View>
      ))}
      {renderTaxRateRows()}
      <View style={styles.tr}>
        <Text style={{...styles.td, ...styles.totalLabel}}>Total TTC</Text>
        <Text style={{...styles.td, ...styles.totalAmount}}>
          {toEuro(document.total * (1 + Number(document.taxRate) * 0.01))}
        </Text>
      </View>
    </View>
  )
}
