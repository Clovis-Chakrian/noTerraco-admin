import { Dimensions, StyleSheet } from 'react-native';
import { general, colors, fonts } from '../../styles';

const styles = StyleSheet.create({
  ...general,
  container: {
    width: Dimensions.get('screen').width,
    height: 80,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    backgroundColor: colors.primary[0],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  image: {
    height: 80,
    width: 80,
  }
});

export default styles;