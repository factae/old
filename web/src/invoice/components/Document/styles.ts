import {StyleSheet, Font} from '@react-pdf/renderer'
import {Theme} from '@material-ui/core'

Font.register(
  'https://raw.githubusercontent.com/google/fonts/master/apache/roboto/Roboto-Regular.ttf',
  {
    family: 'Roboto',
  },
)

Font.register(
  'https://raw.githubusercontent.com/google/fonts/master/apache/roboto/Roboto-Bold.ttf',
  {
    family: 'Roboto Bold',
  },
)

Font.register(
  'https://raw.githubusercontent.com/google/fonts/master/apache/robotocondensed/RobotoCondensed-Regular.ttf',
  {
    family: 'Roboto Condensed',
  },
)

Font.register(
  'https://raw.githubusercontent.com/google/fonts/master/apache/robotocondensed/RobotoCondensed-Bold.ttf',
  {
    family: 'Roboto Condensed Bold',
  },
)

export default function(theme: Theme) {
  return StyleSheet.create({
    page: {
      color: theme.palette.text.secondary,
      fontFamily: 'Roboto',
      fontSize: 12,
      padding: theme.spacing.unit * 4,
    },
    name: {
      fontFamily: 'Roboto Bold',
      fontSize: 14,
      marginBottom: theme.spacing.unit,
    },
    siren: {
      marginTop: 8,
      fontSize: 10,
    },
    taxId: {
      fontSize: 10,
    },
    title: {
      fontFamily: 'Roboto Condensed',
      fontSize: 36,
      textTransform: 'uppercase',
    },
    subTitle: {
      color: theme.palette.primary.main,
      fontFamily: 'Roboto Condensed Bold',
      fontSize: 14,
      marginBottom: theme.spacing.unit / 2,
      textTransform: 'uppercase',
    },
    metadata: {
      justifyContent: 'center',
      display: 'flex',
      flex: 1,
    },
    metadataTitle: {
      color: theme.palette.primary.main,
      fontFamily: 'Roboto Condensed Bold',
      fontSize: 14,
      marginBottom: theme.spacing.unit / 2,
      textTransform: 'uppercase',
    },
    metadataItem: {
      marginBottom: theme.spacing.unit / 2,
      marginTop: 2,
      textAlign: 'right',
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
    table: {
      borderStyle: 'solid',
      borderColor: theme.palette.grey[200],
      borderWidth: 1,
      borderBottomWidth: 0,
      display: 'flex',
      fontSize: 10,
      marginBottom: theme.spacing.unit * 4,
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
      fontFamily: 'Roboto Condensed Bold',
      textTransform: 'uppercase',
    },
    description: {
      flex: 2,
      textAlign: 'left',
    },
    textMuted: {
      color: theme.palette.grey[400],
    },
    subTotal: {
      fontFamily: 'Roboto Condensed',
      flex: 4,
    },
    totalLabel: {
      flex: 4,
      fontFamily: 'Roboto Condensed Bold',
      textTransform: 'uppercase',
      fontSize: 11,
    },
    totalAmount: {
      fontFamily: 'Roboto Condensed Bold',
      textTransform: 'uppercase',
      fontSize: 11,
    },
    bankTitle: {
      fontFamily: 'Roboto Condensed Bold',
      textTransform: 'uppercase',
      fontSize: 10,
      marginBottom: theme.spacing.unit,
    },
    bankItem: {
      fontSize: 9,
    },
    conditions: {
      fontSize: 10,
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
