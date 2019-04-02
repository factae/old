import {StyleSheet} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core'

export default function(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      color: theme.palette.primary.main,
      fontFamily: 'Roboto Condensed Bold',
      fontSize: 14,
      marginBottom: theme.spacing.unit / 2,
      textTransform: 'uppercase',
    },
    identification: {
      fontSize: 9,
      marginTop: theme.spacing.unit,
    },
  })
}
