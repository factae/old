import {Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

export const useStyles = makeStyles((theme: Theme) => {
  const {unit} = theme.spacing

  return {
    button: {
      flex: 1,
      margin: unit,
    },
    icon: {
      margin: `0 ${unit / 2}px 1px 0`,
    },
  }
})
