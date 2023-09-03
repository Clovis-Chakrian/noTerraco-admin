import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../../styles';
import { IDisheCard } from '../../../@types';

const DisheCard: React.FC<IDisheCard> = ({
  name,
  imageUrl,
  description,
  price,
  editFunction,
  deleteFunction,
  avaibilityFunction,
  avaibility
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dataView}>
        <View>
          {imageUrl
            ?
            <Image style={styles.image} source={{ uri: imageUrl }} />
            :
            <View style={styles.image} />
          }
        </View>

        <View>
          <Text style={styles.label}>{name}</Text>
          <Text style={[styles.text, { width: Dimensions.get('window').width / 2 - 10, height: Dimensions.get('window').height / 6.5 }]}>{description}</Text>
          <View style={styles.priceView}>

            <Text style={[styles.label, styles.price]}>
              R${price}
            </Text>
          </View>
        </View>
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

export default DisheCard;