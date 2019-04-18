import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import createPalette from '@material-ui/core/styles/createPalette'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'Quicksand',
  },
  palette: createPalette({
    primary: {
      main: '#1c9dc3',
    },
    secondary: {
      main: '#cc315e',
    },
  }),
})

export default theme
