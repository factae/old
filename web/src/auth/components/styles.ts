import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 4,
  },
  title: {
    fontFamily: 'Quicksand, sans-serif',
    fontWeight: 700,
    marginTop: theme.spacing.unit * 2,
  },
  subtitle: {
    fontFamily: 'Quicksand, sans-serif',
    marginBottom: theme.spacing.unit * 3,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    marginTop: theme.spacing.unit * 2.5,
  },
  changeAction: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'none',
    marginBottom: theme.spacing.unit,
  },
}))
