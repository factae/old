import {Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

export const useStyles = makeStyles((theme: Theme) => {
  const {unit} = theme.spacing

  return {
    actions: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-around',
    },
    submit: {
      height: '100%',
    },
    error: {
      background: theme.palette.error.main,
      color: theme.palette.common.white,
    },
    icon: {
      margin: `0 ${unit / 2}px 1px 0`,
    },
    cell: {
      padding: unit,
      '&:last-child': {
        padding: unit,
      },
    },
    spacing: {
      '&>$item': {
        [theme.breakpoints.only('xs')]: {
          paddingBottom: unit / 2,
        },
        [theme.breakpoints.up('sm')]: {
          paddingRight: unit / 2,
        },
      },
    },
    item: {},
  }
})
