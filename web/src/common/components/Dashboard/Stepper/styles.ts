import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginBottom: theme.spacing.unit,
  },
  stepper: {
    background: 'transparent',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
  label: {
    '&$labelActive': {
      fontWeight: 'bold',
    },
  },
  labelActive: {},
}))
