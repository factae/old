import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: theme.palette.secondary.main,
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
  },
  title: {
    marginTop: theme.spacing.unit * 16,
    marginBottom: theme.spacing.unit * 4,
    color: theme.palette.common.white,
  },
  description: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 16,
  },
}))
