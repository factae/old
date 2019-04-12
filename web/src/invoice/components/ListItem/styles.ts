import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  editable: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  paid: {
    color: theme.palette.grey[500],
  },
  icon: {
    display: 'inline-block',
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
