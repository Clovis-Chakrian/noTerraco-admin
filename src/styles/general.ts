import fonts from "./fonts";
import colors from './colors'
import { Dimensions } from "react-native";

const general = {
  container: {
    flex: 1,
    backgroundColor: colors.primary[0],
    paddingTop: 10,
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
    width: Dimensions.get('screen').width - 40,
    height: 65,
    borderRadius: 10,
    backgroundColor: colors.secondary[1],
    color: colors.text[0],
    fontFamily: fonts.fontFamily,
    paddingHorizontal: 10
  },

  text: {
    fontFamily: fonts.fontFamily,
    fontSize: fonts.fontSize.text,
    color: colors.text[0]
  },

  picker: {
    width: Dimensions.get('screen').width - 20,
    color: colors.primary[1],
    fontFamily: fonts.fontFamilyBold,
    fontSize: fonts.fontSize.subtitle,
    height: 45,
    borderBottomWidth: 1,
    borderColor: colors.secondary[0],
    marginBottom: 20
  },

  pickerItem: {
    color: colors.primary[1],
    fontFamily: fonts.fontFamilyBold,
    fontSize: fonts.fontSize.subtitle
  },

  imageInput: {
    width: Dimensions.get('screen').width - 40,
    height: Dimensions.get('screen').width - 40,
    borderRadius: 10,
  },

  multilineInput: {
    width: Dimensions.get('screen').width - 40,
    height: 180,
    borderRadius: 10,
    backgroundColor: colors.secondary[1],
    color: colors.text[0],
    fontFamily: fonts.fontFamily,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
};

export default general;