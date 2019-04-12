import React from 'react'
import _ from 'lodash/fp'
import {View, Text} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

import {Client} from '../../../../client/model'

import useStyle from './styles'

type Props = {
  theme: Theme
  title: string
  client: Client | null
}

export default function({theme, title, client}: Props) {
  const styles = useStyle(theme)

  if (_.isNull(client)) {
    return null
  }

  function renderName() {
    if (_.isNull(client)) return null

    const fullName = `${client.firstName} ${client.lastName}`
    const name = client.tradingName
      ? `${client.tradingName} (${fullName})`
      : fullName

    return name
  }

  function renderSiren() {
    if (_.isNull(client)) return null
    if (_.isNull(client.siren)) return null

    return <Text style={styles.identification}>{client.siren}</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text>{renderName()}</Text>
      <Text>{client.address}</Text>
      <Text>
        {client.zip} {client.city}
      </Text>
      <Text>{client.email}</Text>
      <Text>{client.phone}</Text>

      {renderSiren()}
    </View>
  )
}
