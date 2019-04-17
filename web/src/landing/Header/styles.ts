import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: theme.palette.grey[200],
    height: `calc(100vh - ${theme.spacing.unit * 8}px)`,
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    paddingTop: theme.spacing.unit * 8,
  },
  grid: {
    height: '100%',
    alignItems: 'flex-end',
  },
  subTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
  },
  screenshotContainer: {
    flex: 1,
  },
  screenshot: {
    width: '100%',
    maxWidth: 1024,
  },
  icon: {
    width: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit,
  },
  badge: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}))
