import { Dimensions, StyleSheet } from 'react-native';
import { colors, fonts, general } from '../../../styles';

const styles = StyleSheet.create({
  ...general,
  input: {
    width: Dimensions.get('screen').width - 20,
    height: 65,
    borderRadius: 10,
    backgroundColor: colors.primary[0],
    color: colors.text[0],
    fontFamily: fonts.fontFamily,
    paddingHorizontal: 10,
    marginBottom: 10
  },
});

export default styles;