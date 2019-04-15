import {StyleSheet} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

export default function(theme: Theme) {
  return StyleSheet.create({
    mention: {
      fontSize: 9,
      color: theme.palette.grey[400],
      marginBottom: theme.spacing.unit,
    },
  })
}
