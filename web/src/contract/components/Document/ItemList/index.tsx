import React, {Fragment} from 'react'
import isNull from 'lodash/isNull'
import {View, Text} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core'

import {toEuro} from '../../../../common/utils/currency'
import {Contract} from '../../../model'

import useStyle from './styles'

type Props = {
  theme: Theme
  contract: Contract
}

export default function({theme, contract}: Props) {
  const styles = useStyle(theme)

  function renderTaxRateRows() {
    if (isNull(contract.taxRate)) {
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
            {toEuro(contract.total)}
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
            TVA
          </Text>
          <Text style={{...styles.td, ...styles.textMuted}}>
            {contract.taxRate} %
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
      {contract.items.map((item, key) => (
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
          {toEuro(contract.total * (1 + Number(contract.taxRate) * 0.01))}
        </Text>
      </View>
    </View>
  )
}
