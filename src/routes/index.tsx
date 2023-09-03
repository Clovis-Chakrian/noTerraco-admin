import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Header, SecondaryHeader } from '../components/Header';
import { StackParamList } from '../@types/routes';
import AccountConfig from '../screens/AccountConfig';
import CreateProduct from '../screens/CreateProduct';
import EditProduct from '../screens/EditProduct';
import Home from '../screens/Home';

import Login from '../screens/Login';

interface IRoutes {
  initialRoute: 'Login' | 'Home'
};

const { Navigator, Screen } = createStackNavigator<StackParamList>();

function Routes({ initialRoute }: IRoutes) {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName={`${initialRoute}`}
        screenOptions={{
          headerShown: true,
          header: () => <Header />
        }}
      >
        <Screen
          name='Login'
          component={Login}
          options={{
            headerShown: false
          }}
        />

        <Screen
          name='Home'
          component={Home}
        />

        <Screen
          name='CreateProduct'
          component={CreateProduct}
          options={{
            header: () => <SecondaryHeader />
          }}
        />

        <Screen
          name='AccountConfig'
          component={AccountConfig}
        />

        <Screen
          name='EditProduct'
          component={EditProduct}
          options={{
            header: () => <SecondaryHeader />
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;