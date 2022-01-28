import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import { colors } from '../../styles';

interface IProductCardProps {
  image?: string,
  title: string,
  description: string,
  price: string,
  priceForTwo: string,
  editFunction: VoidFunction,
  deleteFunction: VoidFunction,
  avaibilityFunction: VoidFunction,
  avaibility: boolean
};

const ProductCard: React.FC<IProductCardProps> = ({
  image,
  title,
  description,
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
          {image
            ?
            <Image style={styles.image} source={{ uri: image }} />
            :
           <View style={styles.image} />
          }
        </View>

        <View>
          <Text style={styles.label}>{title}</Text>
          <Text style={[styles.text, { width: Dimensions.get('window').width / 2 - 10, height: Dimensions.get('window').height / 6.5 }]}>{description}</Text>
          <View style={styles.priceView}>
            <Text style={[styles.label, styles.price]}>{priceForTwo}</Text>
            <Text style={[styles.label, styles.price]}>{price}</Text>
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
    </View>
  );
};

export default ProductCard;