import React from 'react'
import {View, Text} from '@react-pdf/renderer'
import isNull from 'lodash/isNull'
import {Theme} from '@material-ui/core'

import {User} from '../../../../user/model'

import useStyle from './styles'

type Props = {
  theme: Theme
  user: User
}

export default function({theme, user}: Props) {
  const styles = useStyle(theme)

  function renderName() {
    if (isNull(user)) return null

    const fullName = `${user.firstName} ${user.lastName}`
    const name = user.tradingName
      ? `${user.tradingName} (${fullName})`
      : fullName

    return <Text style={styles.name}>{name}</Text>
  }

  function renderTax() {
    if (isNull(user)) return null
    if (!user.taxId) return null

    return <Text>N° TVA Intracommunautaire: {user.taxId}</Text>
  }

  if (isNull(user)) {
    return null
  }

  return (
    <View style={styles.container}>
      {renderName()}

      <Text>{user.address}</Text>
      <Text>
        {user.zip} {user.city}
      </Text>
      <Text>{user.phone}</Text>
      <Text>{user.email}</Text>

      <View style={styles.identification}>
        <Text>Siren : {user.siren}</Text>
        {renderTax()}
      </View>
    </View>
  )
}
