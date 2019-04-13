import {StyleSheet} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core/styles/createMuiTheme'

export default function(theme: Theme) {
  return StyleSheet.create({
    table: {
      borderStyle: 'solid',
      borderColor: theme.palette.grey[200],
      borderWidth: 1,
      borderBottomWidth: 0,
      display: 'flex',
      fontSize: 10,
      width: '100%',
    },
    tr: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      borderStyle: 'solid',
      borderColor: theme.palette.grey[200],
      borderBottomWidth: 1,
    },
    td: {
      display: 'flex',
      flex: 1,
      borderWidth: 0,
      paddingHorizontal: 12,
      paddingVertical: 6,
      textAlign: 'right',
    },
    th: {
      display: 'flex',
      flex: 1,
      borderWidth: 0,
      paddingHorizontal: 12,
      paddingVertical: 6,
      textAlign: 'right',
    },
    description: {
      flex: 2,
      textAlign: 'left',
    },
    textMuted: {
      color: theme.palette.grey[400],
    },
    subTotal: {
      fontFamily: 'Quicksand',
      flex: 4,
    },
    totalLabel: {
      flex: 4,
      fontSize: 11,
      fontFamily: 'Quicksand Bold',
    },
    totalAmount: {
      fontSize: 11,
      fontFamily: 'Quicksand Bold',
    },
  })
}
