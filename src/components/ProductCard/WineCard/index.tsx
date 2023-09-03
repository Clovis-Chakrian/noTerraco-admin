import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../../styles';
import { IWineCard } from '../../../@types/components';

const WineCard: React.FC<IWineCard> = ({
  imageUrl,
  name,
  price,
  priceForTwo,
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
          <View style={styles.priceView}>
            <Text style={[styles.label, styles.price]}>
              R${priceForTwo}
              <MaterialCommunityIcons name='bottle-wine' size={22} color={colors.secondary[0]} />
            </Text>


            <Text style={[styles.label, styles.price]}>
              R${price}
              <MaterialCommunityIcons name='glass-wine' size={22} color={colors.secondary[0]} />
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

export default WineCard;