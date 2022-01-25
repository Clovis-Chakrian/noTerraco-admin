import { Dimensions, StyleSheet } from "react-native";
import { colors, fonts, general } from "../../styles/index";


const styles = StyleSheet.create({
  ...general,
  button: {
    width: Dimensions.get('screen').width -40,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary[0],
    borderRadius: 10
  },
  buttonText: {
    color: colors.primary[0],
    fontFamily: fonts.fontFamilyBold,
    fontSize: fonts.fontSize.subtitle
  }
});

export default styles;