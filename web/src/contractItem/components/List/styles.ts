import {Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing.unit * 3,
  },
  hide: {
    visibility: 'hidden',
  },
}))
