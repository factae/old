import {StyleSheet} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

export default function(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      fontSize: 12,
    },
    title: {
      color: theme.palette.primary.main,
      marginBottom: theme.spacing.unit / 2,
    },
    identification: {
      fontSize: 9,
      marginTop: theme.spacing.unit,
    },
  })
}
