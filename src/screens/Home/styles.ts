import { Dimensions, StyleSheet } from "react-native";
import { general, colors, fonts } from "../../styles";

const styles = StyleSheet.create({
  ...general,
  searchView: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  searchInput: {
    margin: 0,
    height: 65,
    width: Dimensions.get('screen').width -70,
    backgroundColor: colors.secondary[1],
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },

  searchButtonView: {
    backgroundColor: colors.secondary[1],
    height: 65,
    width: 50,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;