import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
  iconPrev: {
    marginRight: theme.spacing.unit,
  },
  next: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  iconNext: {
    marginLeft: theme.spacing.unit,
  },
}))
