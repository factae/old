import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: `${theme.spacing.unit * 12}px ${theme.spacing.unit * 4}px`,
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
    },
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    minHeight: 180,
    [theme.breakpoints.down('xs')]: {
      minHeight: 'inherit',
    },
  },
  icon: {
    marginRight: theme.spacing.unit,
    color: theme.palette.primary.main,
  },
  title: {
    marginBottom: theme.spacing.unit * 6,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      fontSize: '2.5rem',
      marginBottom: theme.spacing.unit * 4,
    },
  },
  subtitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing.unit,
  },
  desc: {
    textAlign: 'center',
    fontSize: '.9rem',
  },
}))
