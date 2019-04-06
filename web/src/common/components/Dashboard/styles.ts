import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => {
  const {breakpoints} = theme

  return {
    container: {
      [breakpoints.down('sm')]: {
        padding: '0 16px',
      },
    },
  }
})
