import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  inputRoot: {
    '&$inputFocused $inputNotchedOutline': {
      borderColor: theme.palette.grey[400],
    },
  },
  inputFocused: {},
  inputNotchedOutline: {},
  labelRoot: {
    '&$labelFocused': {
      color: theme.palette.grey[400],
    },
  },
  labelFocused: {},
}))
