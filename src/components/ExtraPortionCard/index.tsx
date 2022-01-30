import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../styles/index';
import styles from './styles';

interface IExtraPortionCard {
  avaibilityFunction: VoidFunction,
  editFunction: VoidFunction,
  deleteFunction: VoidFunction,
  avaibility: boolean,
  title: string,
  price: number
};

const ExtraPortionCard: React.FC<IExtraPortionCard> = ({
  avaibilityFunction,
  editFunction,
  deleteFunction,
  avaibility,
  title,
  price
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textsView}>
        <Text style={styles.label}>{title}</Text>
        <Text style={[styles.label, { color: colors.secondary[0] }]}>R${price}</Text>
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
    </View>
  );
};

export default ExtraPortionCard;