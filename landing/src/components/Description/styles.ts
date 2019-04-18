import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: '#333333',
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    padding: `${theme.spacing.unit * 12}px ${theme.spacing.unit * 4}px`,
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
    },
  },
  title: {
    marginBottom: theme.spacing.unit * 6,
    color: theme.palette.common.white,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
      fontSize: '2.5rem',
      marginBottom: theme.spacing.unit * 4,
    },
  },
  description: {
    color: theme.palette.common.white,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left',
    },
  },
}))
