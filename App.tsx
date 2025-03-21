import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Routes from './src/routes';
import * as SecureStore from 'expo-secure-store';

export default function App() {
  let [fontsLoaded] = useFonts({
    'SpaceGrotesk-Regular': require('./assets/fonts/SpaceGrotesk-Regular.ttf'),
    'SpaceGrotesk-Bold': require('./assets/fonts/SpaceGrotesk-Bold.ttf'),
  });

  const [hasSaveCredentials, sethasSaveCredentials] = useState<boolean>()

  async function loadCredentials() {
    const user = await SecureStore.getItemAsync('user')
    if (user) {
      sethasSaveCredentials(true);
      return
    };
    sethasSaveCredentials(false);
  }

  useEffect(() => {
    loadCredentials();
   });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <StatusBar style='dark' hidden />
        <Image style={{ height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }} source={require('./assets/splash.png')}/>
      </View>
    );
  } else {
    return (
      <>
        <StatusBar style='dark' hidden />
        <Routes initialRoute={'Home'} />
      </>
    );
  };
}

//hasSaveCredentials ? 'Home' : 'Login'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
