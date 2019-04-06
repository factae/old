import React from 'react'
import isNull from 'lodash/isNull'
import {View, Text} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

import {Client} from '../../../../client/model'

import useStyle from './styles'

type Props = {
  theme: Theme
  title: string
  client: Client
}

export default function({theme, title, client}: Props) {
  const styles = useStyle(theme)

  function renderName() {
    const fullName = `${client.firstName} ${client.lastName}`
    const name = client.tradingName
      ? `${client.tradingName} (${fullName})`
      : fullName

    return name
  }

  function renderSiren() {
    if (isNull(client.siren)) return null
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
