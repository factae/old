import React from 'react'
import {Text} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

import useStyle from './styles'

type Props = {
  theme: Theme
}

export default function({theme}: Props) {
  const styles = useStyle(theme)

  return (
    <Text
      fixed
      style={styles.pagination}
      render={props => `${props.pageNumber} / ${props.totalPages}`}
    />
  )
}
