import { Dimensions, StyleSheet } from 'react-native';
import { colors, general } from '../../../styles';

const styles = StyleSheet.create({
  ...general,
  imageInputView: {
    marginVertical: 10
  },
  imageInput: {
    width: Dimensions.get('screen').width - 20,
    height: Dimensions.get('screen').width - 40,
    borderRadius: 10,
    backgroundColor: colors.primary[0],
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: Dimensions.get('screen').width - 20,
    height: Dimensions.get('screen').width - 40,
    borderRadius: 10,
  }
});

export default styles;