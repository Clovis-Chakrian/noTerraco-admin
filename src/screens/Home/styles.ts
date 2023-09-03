import { Dimensions, StyleSheet } from "react-native";
import { general, colors } from "../../styles";

const styles = StyleSheet.create({
  ...general,
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },

  searchInput: {
    margin: 0,
    height: 58,
    width: Dimensions.get('screen').width -70,
    backgroundColor: colors.primary[0],
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    paddingLeft: 10,
    elevation: 5
  },

  searchButtonView: {
    backgroundColor: colors.primary[0],
    height: 58,
    width: 50,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
});

export default styles;