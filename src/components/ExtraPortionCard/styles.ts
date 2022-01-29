import { Dimensions, StyleSheet } from "react-native";
import { colors, general } from "../../styles";

const styles = StyleSheet.create({
  ...general,
  container: {
    width: Dimensions.get('screen').width - 20,
    height: 120,
    elevation: 5,
    backgroundColor: colors.primary[0],
    borderRadius: 10,
    marginBottom: 20,
    padding: 10
  },

  textsView: {},

  buttonsView: {
    width: Dimensions.get('window').width,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default styles;