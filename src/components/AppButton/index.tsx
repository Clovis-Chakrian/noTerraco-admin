import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

interface IAppButton {
  buttonFunction?: VoidFunction;
  buttonText: string
};

const AppButton: React.FC<IAppButton> = ({ buttonFunction, buttonText }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={buttonFunction}>
      <Text style={styles.buttonText}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
}; 

export default AppButton;