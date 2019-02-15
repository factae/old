import {makeStyles} from '@material-ui/styles'

export const useStyles = makeStyles({
  navigation: {
    marginBottom: 32,
    position: 'relative',
  },
  brand: {
    flexGrow: 1,
    fontFamily: 'Kaushan Script, cursive',
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
