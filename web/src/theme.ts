import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import createPalette from '@material-ui/core/styles/createPalette'

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
})

export default theme
