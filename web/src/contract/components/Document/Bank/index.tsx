import React from 'react'
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

  return (
    <View>
      <Text style={styles.title}>Coordonnées bancaires :</Text>
      <Text style={styles.item}>RIB : {user.rib}</Text>
      <Text style={styles.item}>IBAN : {user.iban}</Text>
      <Text style={styles.item}>BIC : {user.bic}</Text>
    </View>
  )
}
