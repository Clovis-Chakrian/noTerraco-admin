import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { IImageInput } from '../../../@types';
import { colors } from '../../../styles';

const ImageInput: React.FC<IImageInput> = ({
  icon,
  label,
  onPressFunction,
  uri
}) => {
  return (
    <View style={styles.imageInputView}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.imageInput} onPress={onPressFunction}>
        {
          uri ?
            <Image style={styles.image} source={{ uri }} />
            :
            <Ionicons name={icon} color={colors.primary[1]} size={32} />
        }
      </TouchableOpacity>
    </View>
  );
};

export default ImageInput;