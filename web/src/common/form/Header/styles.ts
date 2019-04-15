import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    borderBottom: `1px dashed ${theme.palette.grey[300]}`,
  },
  icon: {
    margin: `0 ${theme.spacing.unit / 2}px 1px 0`,
  },
  action: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
  },
}))
