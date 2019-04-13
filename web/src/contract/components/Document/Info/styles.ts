import {StyleSheet} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

export default function(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    rowContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    section: {
      justifyContent: 'center',
      display: 'flex',
      flex: 1,
    },
    title: {
      fontSize: 12,
      color: theme.palette.primary.main,
      marginBottom: theme.spacing.unit / 2,
    },
    item: {
      marginBottom: theme.spacing.unit / 2,
      textAlign: 'right',
    },
  })
}
