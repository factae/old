import React from 'react'
import every from 'lodash/every'
import isNull from 'lodash/isNull'
import {View, Text} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

import {User} from '../../../../user/model'

import useStyle from './styles'

type Props = {
  theme: Theme
  user: User
}

export default function({theme, user}: Props) {
  const styles = useStyle(theme)

  if (every([user.rib, user.iban, user.bic], isNull)) {
    return null
  }

  return (
    <View>
      <Text style={styles.title}>Coordonnées bancaires :</Text>
      {user.rib && <Text style={styles.item}>RIB : {user.rib}</Text>}
      {user.iban && <Text style={styles.item}>IBAN : {user.iban}</Text>}
      {user.bic && <Text style={styles.item}>BIC : {user.bic}</Text>}
    </View>
  )
}
