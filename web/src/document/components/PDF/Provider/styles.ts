import {StyleSheet} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

export default function(theme: Theme) {
  return StyleSheet.create({
    page: {
      color: theme.palette.text.secondary,
      fontFamily: 'Quicksand',
      fontSize: 12,
      padding: theme.spacing.unit * 4,
    },
    section: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: theme.spacing.unit * 4,
    },
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
    },
    fullWidth: {
      flex: 1,
    },
    pagination: {
      position: 'absolute',
      fontSize: 9,
      color: theme.palette.grey[400],
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
  })
}
