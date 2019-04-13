import {StyleSheet} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

export default function(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    name: {
      fontSize: 14,
    },
    identification: {
      fontSize: 9,
      marginTop: theme.spacing.unit,
    },
  })
}
