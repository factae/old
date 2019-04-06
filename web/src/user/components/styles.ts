import {Theme} from '@material-ui/core/styles/createMuiTheme'
import makeStyles from '@material-ui/styles/makeStyles'

export const useStyles = makeStyles((theme: Theme) => {
  const {unit} = theme.spacing

  return {
    title: {
      margin: `${unit * 2}px 0`,
    },
    subTitle: {
      color: theme.palette.primary.main,
      padding: `${unit * 2}px 0 0 0`,
      margin: `${unit * 4}px 0 ${unit * 2}px 0`,
      borderTop: `1px dashed ${theme.palette.grey.A100}`,
    },
    icon: {
      marginRight: unit,
    },
    footer: {
      borderTop: `1px dashed ${theme.palette.grey.A100}`,
      padding: `${unit * 2}px 0 0 0`,
      marginTop: unit * 4,
    },
    submit: {
      float: 'right',
    },
  }
})
