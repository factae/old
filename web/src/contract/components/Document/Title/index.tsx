import React from 'react'
import {Theme} from '@material-ui/core/styles/createMuiTheme'
import {View, Text} from '@react-pdf/renderer'

import useStyle from './styles'

interface Props {
  title: string
}

export default function({title}: Props) {
  const styles = useStyle()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
