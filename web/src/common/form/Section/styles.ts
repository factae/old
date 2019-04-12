import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderBottom: `1px dashed ${theme.palette.grey.A100}`,
    marginBottom: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 4,
  },
  title: {
    alignItems: 'center',
    color: theme.palette.primary.main,
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  withSubtitle: {
    marginBottom: 0,
  },
  subtitle: {
    marginBottom: theme.spacing.unit * 2,
  },
  tooltip: {
    display: 'flex',
  },
  action: {
    marginLeft: theme.spacing.unit,
    padding: theme.spacing.unit / 2,
  },
}))
