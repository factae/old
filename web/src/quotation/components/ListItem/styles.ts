import {Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  draft: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  nonDraft: {
    color: theme.palette.grey[500],
  },
  icon: {
    display: 'inline-block',
  },
}))
