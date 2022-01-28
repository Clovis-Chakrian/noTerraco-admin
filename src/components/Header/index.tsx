import { Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

import styles from './styles';
import { colors } from '../../styles';

const Logo = require('../../assets/logo.png')

interface IHeaderProps {
  homeScreen: boolean,
  displayRightIcon: boolean,
  leftButtonFunction: VoidFunction,
  rightButtonFunction?: VoidFunction
};

const Header: React.FC<IHeaderProps> = ({ homeScreen, displayRightIcon, leftButtonFunction, rightButtonFunction }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={leftButtonFunction}>
        <FontAwesome name={homeScreen ? 'user' : 'arrow-left'} size={32} color={colors.secondary[0]} />
      </TouchableOpacity>

      <Image source={Logo} style={styles.image} />

      <TouchableOpacity onPress={rightButtonFunction}>
        <FontAwesome name={homeScreen ? 'plus' : 'save'} size={32} color={colors.secondary[0]} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;