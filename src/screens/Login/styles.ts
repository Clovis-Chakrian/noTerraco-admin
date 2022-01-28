import { Dimensions, StyleSheet } from "react-native";
import { general, colors, fonts } from '../../styles/index';

const styles = StyleSheet.create({
  ...general,

  image: {
    marginTop: 40,
    width: 150,
    height: 150,
    backgroundColor: '#c3c3c3',
    borderRadius: 10
  },

  titleContainer: {
    marginTop: 40,
    marginBottom: 40
  },

  inputView: {
    marginBottom: 50
  },

  buttonView: {

  },

  passwordInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  passwordInput: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: Dimensions.get('screen').width - 70
  },

  showPassButton: {
    width: 30,
    height: 65,
    backgroundColor: colors.secondary[1],
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rememberView: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default styles;