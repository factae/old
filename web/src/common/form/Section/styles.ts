import {Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

export const useStyles = makeStyles((theme: Theme) => {
  const {unit} = theme.spacing

  return {
    title: {
      alignItems: 'center',
      borderTop: `1px dashed ${theme.palette.grey.A100}`,
      color: theme.palette.primary.main,
      display: 'flex',
      margin: `${unit * 4}px 0 ${unit * 2}px 0`,
      padding: `${unit * 2}px 0 0 0`,
    },
    withSubtitle: {
      marginBottom: 0,
    },
    subtitle: {
      marginBottom: unit * 2,
    },
    tooltip: {
      display: 'flex',
    },
    action: {
      marginLeft: unit,
      padding: unit / 2,
    },
  }
})
