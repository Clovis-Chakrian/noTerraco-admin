import { StyleSheet } from "react-native";
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

  footer: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'flex-end'
  }
});

export default styles;