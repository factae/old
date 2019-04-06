import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => {
  const {unit} = theme.spacing

  return {
    title: {
      display: 'flex',
      alignItems: 'center',
      margin: `${unit * 2}px 0`,
    },
    icon: {
      margin: `0 ${unit / 2}px 1px 0`,
    },
    action: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-end',
    },
  }
})
