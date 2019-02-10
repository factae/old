import {makeStyles} from '@material-ui/styles'

export const useStyles = makeStyles({
  navigation: {
    marginBottom: 32,
    position: 'relative',
  },
  progress: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  title: {
    cursor: 'pointer',
    flexGrow: 1,
    fontFamily: 'Kaushan Script, cursive',
  },
})
