import {Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

export const useStyles = makeStyles((theme: Theme) => {
  const {unit} = theme.spacing

  return {
    title: {
      display: 'flex',
      alignItems: 'center',
      margin: `${unit * 2}px 0`,
    },
    action: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-end',
    },
  }
})
