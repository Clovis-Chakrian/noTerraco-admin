import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import { IInput } from '../../../@types';
import { colors } from '../../../styles';

const Input: React.FC<IInput> = ({
  placeholder,
  onChangeText,
  label,
  initialValue
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
      placeholder={placeholder}
      keyboardType='default'
      placeholderTextColor={colors.placeholder}
      onChangeText={text => onChangeText(text)}
      style={styles.input}
      defaultValue={initialValue}
      />
    </View>
  );
};

export default Input;