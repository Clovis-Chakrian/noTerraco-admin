import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../../styles';
import { IMainDisheCard } from '../../../@types';

const MainDisheCard: React.FC<IMainDisheCard> = ({
  avaibility,
  avaibilityFunction,
  deleteFunction,
  description,
  editFunction,
  imageUrl,
  name,
  price,
  priceForTwo,
  subtype,
  type
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
              <Ionicons name='md-person' size={16} color={colors.secondary[0]} />
            </Text>



            <Text style={[styles.label, styles.price]}>
              R${priceForTwo}
              <Ionicons name='people-sharp' size={16} color={colors.secondary[0]} />
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

export default MainDisheCard;