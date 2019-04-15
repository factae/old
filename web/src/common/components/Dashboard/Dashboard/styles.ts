import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 8,
  },
  paper: {
    height: '100%',
    padding: theme.spacing.unit * 2,
  },
  section: {
    flex: 1,
  },
  title: {
    color: theme.palette.secondary.dark,
    borderBottom: `1px dashed ${theme.palette.grey.A100}`,
    marginBottom: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 2,
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 2,
    textDecoration: 'none',
  },
  iconSubtitle: {
    marginRight: theme.spacing.unit,
  },
  link: {
    fontFamily: 'Quicksand',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    marginLeft: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit / 1.5,
    marginTop: theme.spacing.unit / 1.5,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  subtitleLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  iconLink: {
    marginRight: theme.spacing.unit / 2,
  },
}))
