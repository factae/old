import {StyleSheet} from '@react-pdf/renderer'

export default function() {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontFamily: 'Quicksand',
      fontSize: 36,
      textTransform: 'uppercase',
      letterSpacing: -0.5,
    },
  })
}
