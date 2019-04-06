import {StyleSheet} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

export default function(theme: Theme) {
  return StyleSheet.create({
    title: {
      fontFamily: 'Roboto Condensed Bold',
      textTransform: 'uppercase',
      fontSize: 10,
      marginBottom: theme.spacing.unit,
    },
    item: {
      fontSize: 9,
    },
  })
}
