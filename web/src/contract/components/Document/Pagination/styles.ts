import {StyleSheet} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core'

export default function(theme: Theme) {
  return StyleSheet.create({
    pagination: {
      position: 'absolute',
      fontSize: 9,
      color: theme.palette.grey[400],
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
  })
}
