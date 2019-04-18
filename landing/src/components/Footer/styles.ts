import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: '#333333',
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 4}px`,
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
    },
  },
  text: {
    color: theme.palette.common.white,
    marginBottom: 0,
  },
}))
