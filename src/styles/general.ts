import fonts from "./fonts";
import colors from './colors'
import { Dimensions, StyleSheet } from "react-native";

const general = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingTop: 10,
  },

  scrollViewContainer: {
    paddingTop: 10,
    paddingBottom: 100,
    alignItems: 'center',
    width: Dimensions.get('window').width
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary[0],
  },

  multilineInput: {
    width: Dimensions.get('screen').width - 40,
    height: 180,
    borderRadius: 10,
    backgroundColor: colors.primary[0],
    color: colors.text[0],
    fontFamily: fonts.fontFamily,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default general;