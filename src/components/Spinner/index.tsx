import { View, ActivityIndicator } from 'react-native';
import { colors } from '../../styles';


const Spinner: React.FC = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size={'large'} color={colors.secondary[0]} />
    </View>
  );
};

export default Spinner;