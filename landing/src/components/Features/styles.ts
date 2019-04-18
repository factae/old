import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: `${theme.spacing.unit * 12}px ${theme.spacing.unit * 4}px`,
    background: theme.palette.secondary.light,
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
    },
  },
  title: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 6,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      fontSize: '2.5rem',
      marginBottom: theme.spacing.unit * 4,
    },
  },
  feature: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
  text: {
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}))
