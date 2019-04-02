import {makeStyles} from '@material-ui/styles'

export const useStyles = makeStyles({
  navigation: {
    marginBottom: 32,
    position: 'relative',
  },
  brand: {
    flexGrow: 1,
    fontFamily: 'Quicksand, sans-serif',
    fontWeight: 700,
  },
  title: {
    cursor: 'pointer',
  },
  progress: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
})
