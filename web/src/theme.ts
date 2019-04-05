import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import createPalette from '@material-ui/core/styles/createPalette'
import primary from '@material-ui/core/colors/deepPurple'
import secondary from '@material-ui/core/colors/teal'

const defaultTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
})

const {unit} = defaultTheme.spacing

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'Quicksand',
  },
  palette: createPalette({
    primary: {
      main: '#9d1577',
    },
    secondary: {
      main: '#04696a',
    },
  }),
  overrides: {
    MuiDialogContent: {
      root: {
        paddingTop: unit * 1.5,
      },
    },
  },
})

export default theme
