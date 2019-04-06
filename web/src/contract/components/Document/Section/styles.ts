import {StyleSheet} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

export default function(theme: Theme) {
  return StyleSheet.create({
    section: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: theme.spacing.unit * 4,
    },
  })
}
