import React from 'react'
import isNull from 'lodash/isNull'
import {Text} from '@react-pdf/renderer'

import useStyle from './styles'

type Props = {
  conditions: string | null
}

export default function({conditions}: Props) {
  const styles = useStyle()

  if (isNull(conditions)) return null
  return <Text style={styles.conditions}>{conditions}</Text>
}
