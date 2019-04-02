import React, {ReactNode} from 'react'
import {View} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core'

import useStyle from './styles'

type Props = {
  theme: Theme
  children: ReactNode
}

export default function({theme, children}: Props) {
  const styles = useStyle(theme)
  return <View style={styles.section}>{children}</View>
}
