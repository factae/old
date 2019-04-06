import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => {
  const {breakpoints} = theme

  return {
    cards: {
      [breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    cardTitle: {
      alignItems: 'center',
      display: 'flex',
    },
    icon: {
      height: '1.3em',
      marginRight: 8,
      width: '1.3em',
    },
  }
})
