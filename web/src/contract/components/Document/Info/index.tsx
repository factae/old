import React from 'react'
import {View, Text} from '@react-pdf/renderer'
import keys from 'lodash/keys'
import values from 'lodash/values'
import {Theme} from '@material-ui/core'

import useStyle from './styles'

type Props = {
  theme: Theme
  infos: {[key: string]: string}
}

export default function({theme, infos}: Props) {
  const styles = useStyle(theme)

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.section}>
          {keys(infos).map(title => (
            <Text key={title} style={styles.title}>
              {title}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          {values(infos).map((item, key) => (
            <Text key={key} style={styles.item}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    </View>
  )
}
