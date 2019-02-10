import {Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

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
