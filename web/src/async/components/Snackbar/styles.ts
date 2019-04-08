import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => {
  return {
    snackbar: {
      cursor: 'pointer',
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
  }
})
