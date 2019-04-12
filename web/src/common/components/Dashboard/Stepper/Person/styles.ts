import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  stepper: {
    background: 'transparent',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
  form: {
    marginBottom: theme.spacing.unit * 4,
  },
  icon: {
    marginLeft: theme.spacing.unit / 2,
  },
}))
