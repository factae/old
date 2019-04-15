import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => {
  const {unit} = theme.spacing

  return {
    buttonContainer: {
      display: 'flex',
    },
    button: {
      background: theme.palette.grey[200],
      border: `1px solid ${theme.palette.primary.light}`,
      flex: 1,
    },
    icon: {
      margin: `0 ${unit / 2}px 1px 0`,
    },
  }
})
