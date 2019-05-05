import React from 'react'
import {View, Text} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'
import _ from 'lodash/fp'

import {Client, getClientFullName} from '../../../../client/model'
import {isQuotation} from '../../../../quotation/model'
import {isInvoice} from '../../../../invoice/model'
import {isCredit} from '../../../../credit/model'
import {Document} from '../../../model'

import useStyle from './styles'

type Props = {
  theme: Theme
  document: Document
  client: Client
}

export default function({theme, document, client}: Props) {
  const styles = useStyle(theme)

  function renderTitle() {
    if (isQuotation(document)) return "Devis à l'attention de"
    if (isInvoice(document)) return 'Facturé à'
    if (isCredit(document)) return "Avoir à l'attention de"

    return null
  }

  function renderSiret() {
    if (_.isNull(client)) return null
    if (_.isNull(client.siret)) return null

    return <Text style={styles.identification}>SIRET: {client.siret}</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{renderTitle()}</Text>

      <Text>{getClientFullName(client)}</Text>
      <Text>{client.address}</Text>
      <Text>
        {client.zip} {client.city}, {client.country}
      </Text>
      <Text>{client.email}</Text>
      <Text>{client.phone}</Text>

      {renderSiret()}
    </View>
  )
}
