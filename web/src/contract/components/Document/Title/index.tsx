import React from 'react'
import {View, Text} from '@react-pdf/renderer'

import useStyle from './styles'

interface Props {
  title: string
}

export default function(props: Props) {
  const styles = useStyle()

  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  )
}
