/* import {Theme} from '@material-ui/core/styles/createMuiTheme' */
/* import makeStyles from '@material-ui/styles/makeStyles' */

/* export const useStyles = makeStyles((theme: Theme) => ({ */
/*   draft: { */
/*     cursor: 'pointer', */
/*     '&:hover': { */
/*       backgroundColor: theme.palette.grey[100], */
/*     }, */
/*   }, */
/*   nonDraft: { */
/*     color: theme.palette.grey[500], */
/*   }, */
/*   icon: { */
/*     display: 'inline-block', */
/*   }, */
/*   spacing: { */
/*     '&>$item': { */
/*       [theme.breakpoints.only('xs')]: { */
/*         paddingBottom: theme.spacing.unit / 2, */
/*       }, */
/*       [theme.breakpoints.up('sm')]: { */
/*         paddingRight: theme.spacing.unit / 2, */
/*       }, */
/*     }, */
/*   }, */
/*   item: {}, */
/*   addItem: { */
/*     float: 'right', */
/*   }, */
/* })) */

import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => ({
  tabs: {},
  root: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    '&:hover, &$selected': {
      background: theme.palette.grey[100],
    },
  },
  selected: {},
}))
