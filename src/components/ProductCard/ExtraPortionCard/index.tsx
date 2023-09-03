import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../../styles';
import { IExtraPortionCard } from '../../../@types';

const ExtraPortionCard: React.FC<IExtraPortionCard> = ({
  name,
  price,
  editFunction,
  deleteFunction,
  avaibilityFunction,
  avaibility
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dataView}>
        <Text style={styles.label}>{name}</Text>
        <Text style={[styles.label, styles.price]}>R${price}</Text>
      </View>

      <View style={styles.buttonsView}>
        <TouchableOpacity onPress={avaibilityFunction}>
          <FontAwesome name={avaibility ? 'eye' : 'eye-slash'} color={avaibility ? colors.secondary[0] : '#c3c3c3'} size={22} />
        </TouchableOpacity>

        <TouchableOpacity onPress={editFunction} style={{ marginHorizontal: 30 }}>
          <FontAwesome name='pencil' color={colors.primary[1]} size={22} />
        </TouchableOpacity>

        <TouchableOpacity onPress={deleteFunction}>
          <FontAwesome name='trash' color={'#F00'} size={22} />
        </TouchableOpacity>
      </View>
    </View >
  );
};

export default ExtraPortionCard;