import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing.unit * 3,
  },
  hide: {
    display: 'none',
  },
  delete: {
    padding: theme.spacing.unit / 4,
    marginRight: theme.spacing.unit / 2,
  },
}))
