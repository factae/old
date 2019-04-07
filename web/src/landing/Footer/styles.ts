import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: '#424242',
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  text: {
    color: theme.palette.common.white,
  },
  copyright: {
    marginBottom: theme.spacing.unit * 3,
    color: theme.palette.common.white,
  },
}))
