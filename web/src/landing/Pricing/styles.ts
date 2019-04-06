import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: theme.palette.grey[200],
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
  },
  title: {
    marginBottom: theme.spacing.unit * 8,
  },
  pricing: {
    background: theme.palette.grey[300],
    padding: theme.spacing.unit * 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  pricingPremium: {
    background: theme.palette.primary.light,
    padding: theme.spacing.unit * 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  pricingCustom: {
    background: theme.palette.primary.dark,
    padding: theme.spacing.unit * 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  pricingDivider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    background: theme.palette.common.black,
  },
  pricingPremiumDivider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    background: theme.palette.common.white,
  },
  pricingCustomDivider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    background: theme.palette.common.white,
  },
  pricingHead: {
    textAlign: 'center',
  },
  pricingPremiumHead: {
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  pricingCustomHead: {
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  pricingPremiumText: {
    color: theme.palette.common.white,
  },
  pricingCustomText: {
    color: theme.palette.common.white,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
}))
