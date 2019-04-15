import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  table: {
    marginBottom: theme.spacing.unit * 6,
  },
  header: {
    background: theme.palette.grey[100],
  },
  number: {
    width: '5%',
  },
  date: {
    width: '22%',
  },
  client: {
    width: '25%',
  },
  status: {
    width: '5%',
    textAlign: 'center',
  },
  total: {
    width: '20%',
    textAlign: 'right',
  },
  actions: {
    width: '23%',
    textAlign: 'right',
  },
  legendSummary: {
    display: 'inline-block',
    cursor: 'pointer',
  },
  legendSummaryIcon: {
    float: 'left',
    marginRight: theme.spacing.unit / 2,
  },
  legend: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing.unit / 4,
    transform: 'scale(.8, .8)',
    transformOrigin: 'left',
  },
  legendColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  legendRow: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.grey[600],
    height: 35,
    marginRight: theme.spacing.unit / 2,
  },
}))
