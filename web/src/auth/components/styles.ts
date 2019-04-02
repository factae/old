import {Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

export const useStyles = makeStyles((theme: Theme) => {
  const {breakpoints, spacing} = theme
  const {unit} = spacing

  return {
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [breakpoints.up(400 + unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: unit * 2,
    },
    title: {
      fontFamily: 'Quicksand, sans-serif',
      fontWeight: 700,
      marginTop: unit * 2,
      marginBottom: unit * 3,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
    },
    submit: {
      marginTop: unit * 2.5,
    },
    changeAction: {
      display: 'flex',
      alignItems: 'center',
      marginTop: unit * 8,
      textTransform: 'none',
    },
    inputRoot: {
      '&$inputFocused $inputNotchedOutline': {
        borderColor: theme.palette.secondary.main,
      },
    },
    inputFocused: {},
    inputNotchedOutline: {},
    labelRoot: {
      '&$labelFocused': {
        color: theme.palette.secondary.main,
      },
    },
    labelFocused: {},
  }
})
