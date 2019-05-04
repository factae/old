import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  pay: {
    width: '100%',
    height: '100%',
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
  form: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
  input: {
    padding: '18.5px 14px',
    fontSize: '22px',
    borderRadius: theme.spacing.unit / 2,
    transition: 'border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    border: `1px solid ${theme.palette.grey[200]}`,
    '&:hover': {
      border: `1px solid ${theme.palette.grey[400]}`,
    },
  },
}))
