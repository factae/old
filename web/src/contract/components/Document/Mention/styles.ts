import {StyleSheet} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

export default function(theme: Theme) {
  return StyleSheet.create({
    mention: {
      fontSize: 9,
      fontFamily: 'Roboto Italic',
      color: theme.palette.grey[400],
      marginBottom: theme.spacing.unit,
    },
  })
}
