import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  navigation: {
    marginBottom: theme.spacing.unit * 4,
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
}))
