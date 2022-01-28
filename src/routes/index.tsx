import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AccountConfig from '../screens/AccountConfig';
import CreateProduct from '../screens/CreateProduct';
import EditProduct from '../screens/EditProduct';
import Home from '../screens/Home';

import Login from '../screens/Login';

interface IRoutes {
  initialRoute: string
};

const { Navigator, Screen } = createStackNavigator();

function Routes({ initialRoute }: IRoutes) {
  return (
    <NavigationContainer >
      <Navigator
        initialRouteName={`${initialRoute}`}
        screenOptions={{
          headerShown: false,
        }}>
        <Screen name='Login' component={Login} />
        <Screen
          name='Home'
          component={Home}
        />
        <Screen name='CreateProduct' component={CreateProduct} />
        <Screen name='AccountConfig' component={AccountConfig} />
        <Screen name='EditProduct' component={EditProduct} initialParams={{ productId: 1 }} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;