import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'
import premium from '@material-ui/core/colors/orange'

export const useStyles = makeStyles((theme: Theme) => ({
  navigation: {
    position: 'relative',
  },
  brand: {
    flexGrow: 1,
    fontFamily: 'Quicksand, sans-serif',
    fontWeight: 700,
  },
  title: {
    cursor: 'pointer',
  },
  progress: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  button: {
    color: theme.palette.common.white,
  },
  premium: {
    textAlign: 'center',
  },
  iconPremium: {
    color: premium[400],
  },
}))
