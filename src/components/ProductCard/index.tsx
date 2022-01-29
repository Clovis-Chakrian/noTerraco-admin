import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
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
            <Text style={[styles.label, styles.price]}>
              R$
              {
                String(priceForTwo).includes('.')
                  ?
                  String(priceForTwo).split('.')[1].length == 2
                    ?
                    String(priceForTwo).replace('.', ',')
                    :
                    String(priceForTwo).replace('.', ',') + '0'
                  :
                  String(priceForTwo) + ',00'}
              <Ionicons name='people-sharp' size={16} color={colors.secondary[0]} />
            </Text>


            <Text style={[styles.label, styles.price]}>
              R$
              {
                String(price).includes('.')
                  ?
                  String(price).split('.')[1].length == 2
                    ?
                    String(price).replace('.', ',')
                    :
                    String(price).replace('.', ',') + '0'
                  :
                  String(price) + ',00'
              }
              <Ionicons name='md-person' size={16} color={colors.secondary[0]} />
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

export default ProductCard;