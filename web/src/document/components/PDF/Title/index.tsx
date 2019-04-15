import React from 'react'
import {View, Text} from '@react-pdf/renderer'
import _ from 'lodash/fp'

import {isQuotation} from '../../../../quotation/model'
import {isInvoice} from '../../../../invoice/model'
import {isCredit} from '../../../../credit/model'
import {Document} from '../../../model'

import useStyle from './styles'

type Props = {
  document: Document
}

export default function({document}: Props) {
  const styles = useStyle()

  function renderTitle() {
    if (isQuotation(document)) return 'Devis'
    if (isInvoice(document)) return 'Facture'
    if (isCredit(document)) return 'Avoir'

    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{renderTitle()}</Text>
    </View>
  )
}
