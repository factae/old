import {Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  spacing: {
    '&>$item': {
      [theme.breakpoints.only('xs')]: {
        paddingBottom: theme.spacing.unit / 2,
      },
      [theme.breakpoints.up('sm')]: {
        paddingRight: theme.spacing.unit / 2,
      },
    },
  },
  item: {},
  addItem: {
    float: 'right',
  },
}))
