import React from 'react'
import isNull from 'lodash/isNull'
import {View, Text} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

import useStyle from './styles'

type Props = {
  conditions: string | null
  theme: Theme
}

export default function({conditions, theme}: Props) {
  const styles = useStyle(theme)

  if (isNull(conditions)) return null
  return (
    <View>
      <Text style={styles.conditions}>Conditions générales :</Text>
      <Text style={styles.conditions}>{conditions}</Text>
    </View>
  )
}
