import { Dimensions, StyleSheet } from 'react-native';
import { colors, fonts, general } from '../../styles';

const styles = StyleSheet.create({
  ...general,
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  openPickerButton: {
    width: Dimensions.get('window').width -20,
    height: 65,
    borderRadius: 10,
    backgroundColor: colors.primary[0],
    paddingHorizontal: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  currentOptionLabel: {
    fontFamily: fonts.fontFamilyBold,
    textDecorationLine: 'underline'
  },
  pickerContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  optionsView: {
    width: 300,
    height: 500,
    backgroundColor: colors.primary[0],
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10
  },
  optionButton: {
    marginTop: 20
  }
});

export default styles;