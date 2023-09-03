import { Dimensions, StyleSheet } from "react-native";
import { colors, general } from "../../../styles";

const styles = StyleSheet.create({
  ...general,
  container: {
    width: Dimensions.get('screen').width - 20,
    height: 248,
    elevation: 5,
    backgroundColor: colors.primary[0],
    borderRadius: 10,
    marginBottom: 20
  },

  image: {
    marginRight: 5,
    width: 180,
    height: 180,
    backgroundColor: '#C3c3c3',
    borderRadius: 10
  },

  dataView: {
    flexDirection: 'row',
  },

  buttonsView: {
    width: Dimensions.get('window').width,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  price: {
    color: colors.secondary[0]
  }
});

export default styles;