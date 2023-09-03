import { View, Text, TextInput } from "react-native"
import { IInput } from "../../../@types";
import { colors } from "../../../styles";
import styles from "./styles";

const MultilineInput: React.FC<IInput> = ({
  label,
  onChangeText,
  placeholder,
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
      textAlignVertical='top'
      multiline
      defaultValue={initialValue}
      />
    </View>
  );
};

export default MultilineInput