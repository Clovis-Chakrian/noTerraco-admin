import { View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import styles from './styles';
import { colors } from '../../styles';
import { StackParamList } from '../../@types/routes';

const Logo = require('../../assets/logo.png')

const Header = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('AccountConfig')}>
        <FontAwesome name={'user'} size={32} color={colors.secondary[0]} />
      </TouchableOpacity>

      <Image source={Logo} style={styles.image} />

      <TouchableOpacity onPress={() => navigation.navigate('CreateProduct')}>
        <FontAwesome name={'plus'} size={32} color={colors.secondary[0]} />
      </TouchableOpacity>
    </View>
  );
};

const SecondaryHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name='arrow-left' size={32} color={colors.secondary[0]} />
      </TouchableOpacity>

      <Image source={Logo} style={styles.image} />

      <View />
    </View>
  );
};

export { Header, SecondaryHeader };