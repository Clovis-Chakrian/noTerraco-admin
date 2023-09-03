import { Dimensions, StyleSheet } from 'react-native';
import { general } from '../../../styles';

const styles = StyleSheet.create({
  ...general,
  inputView: {
    marginBottom: 20
  },
  
  pricesView: {
    width: Dimensions.get('window').width -20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default styles;