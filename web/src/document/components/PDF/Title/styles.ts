import {StyleSheet} from '@react-pdf/renderer'

export default function() {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontFamily: 'Helvetica',
      fontSize: 36,
      textTransform: 'uppercase',
    },
  })
}
