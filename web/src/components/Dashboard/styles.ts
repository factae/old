import {Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

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
