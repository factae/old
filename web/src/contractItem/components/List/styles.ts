import {Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  head: {
    backgroundColor: theme.palette.grey[100],
  },
  footer: {
    backgroundColor: theme.palette.grey[100],
  },
}))
