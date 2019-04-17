import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  subscribe: {
    textAlign: 'center',
    marginTop: 0,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      marginTop: theme.spacing.unit * 3,
    },
  },
}))
