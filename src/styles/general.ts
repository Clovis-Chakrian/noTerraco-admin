import fonts from "./fonts";
import colors from './colors'
import { Dimensions } from "react-native";

const general = {
  container: {
    flex: 1,
    backgroundColor: colors.primary[0],
  },

  label: {
    fontSize: fonts.fontSize.label,
    fontFamily: fonts.fontFamilyBold,
    color: colors.text[0],
    marginBottom: 5
  },

  title: {
    fontFamily: fonts.fontFamilyBold,
    fontSize: fonts.fontSize.title,
    color: colors.text[0]
  },

  input: {
    width: Dimensions.get('screen').width -40,
    height: 65,
    borderRadius: 10,
    backgroundColor: colors.secondary[1],
    color: colors.text[0],
    fontFamily: fonts.fontFamily,
    paddingHorizontal: 10
  },
};

export default general;