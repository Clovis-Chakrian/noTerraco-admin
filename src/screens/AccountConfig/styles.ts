import { StyleSheet } from 'react-native'
import { general, fonts, colors } from '../../styles';

const styles = StyleSheet.create({
  ...general,

  rememberView: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default styles;