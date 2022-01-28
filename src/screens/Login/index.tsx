import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AppButton from '../../components/AppButton';
import React, { useState } from 'react';
import { PropsLogin } from '../../@types/routes';
import styles from './styles';
import api from '../../services/api';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../styles';
import * as SecureStore from 'expo-secure-store';

const Logo = require('../../assets/logo.png');

function Login({ navigation, route }: PropsLogin) {
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [rememberMe, setRememberMe] = useState(false);
  const [visible, setVisible] = useState(true);
  //const [loacalDataLoaded, setLoacalDataLoaded] = useState(false);

  async function login(username: string | undefined, userpass: string | undefined) {
    await api.get('/login', {
      params: {
        userName: username,
        password: userpass
      }
    }).then(async res => {
      if (res.status == 200) {
        if (rememberMe) {
          await SecureStore.setItemAsync('user', `${username}`);
          await SecureStore.setItemAsync('password', `${password}`);
          navigation.navigate('Home');
        } else {
          Alert.alert('Atenção', 'Ative o lembre-me ou a aplicação não funcionará corretamente!')
          //navigation.navigate('Home');
        };
      }
    }).catch(err => {
      alert('Usuário ou senha incorretos');
      console.error(err);
    });
  };

  return (
    <ScrollView style={[styles.container]} contentContainerStyle={{ alignItems: 'center' }}>
      <View>
        <Image source={Logo} style={styles.image} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Entrar</Text>
      </View>

      <View style={styles.inputView}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} placeholder='Nome' autoCompleteType='off' onChangeText={text => setName(text)} />

        <Text style={[styles.label, { marginTop: 20 }]}>Senha</Text>
        <View style={styles.passwordInputView}>
          <TextInput style={[styles.input, styles.passwordInput]} secureTextEntry={visible} caretHidden placeholder='Senha' autoCompleteType="off" onChangeText={text => setPassword(text)} />
          <View style={styles.showPassButton}>
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <FontAwesome name={visible ? 'eye-slash' : 'eye'} size={22} color={!visible ? colors.secondary[0] : colors.primary[1]} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rememberView}>
          <TouchableOpacity style={{ marginRight: 5 }} onPress={() => setRememberMe(!rememberMe)}>
            <FontAwesome name={rememberMe ? 'check-square' : 'square'} size={22} color={rememberMe ? colors.secondary[0] : colors.secondary[1]} />
          </TouchableOpacity>
          <Text style={styles.label}>
            Lembre-me
          </Text>
        </View>
      </View>

      <View style={styles.buttonView}>
        <AppButton buttonText='Entrar' buttonFunction={() => login(name, password)} />
      </View>
    </ScrollView>
  );
};

export default Login;