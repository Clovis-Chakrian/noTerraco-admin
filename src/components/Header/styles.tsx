import { Dimensions, StyleSheet } from 'react-native';
import { general, colors, fonts } from '../../styles';

const styles = StyleSheet.create({
  ...general,
  container: {
    width: Dimensions.get('screen').width,
    height: 100,
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
    height: 100,
    width: 100,
  }
});

export default styles;