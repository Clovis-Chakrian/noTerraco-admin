import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Header from '../../components/Header';
import AppButton from '../../components/AppButton';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useEffect, useState } from 'react';
import { colors } from '../../styles';
import { FontAwesome } from '@expo/vector-icons';
import { PropsAccountConfig } from '../../@types/routes';
import { IAdmin } from '../../@types/interfaces';
import api from '../../services/api';
import * as SecureStore from 'expo-secure-store';

function AccountConfig({ route, navigation }: PropsAccountConfig) {
  const [rememberMe, setRememberMe] = useState(false);
  const [admin, setAdmin] = useState<IAdmin | undefined>();
  const [oldPassword, setOldPassword] = useState<string>();
  const [newName, setNewName] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>()

  async function getAdminData() {
    await api.get('/admin/1').then(response => {
      if (response.status == 200) setAdmin(response.data);
    }).catch(err => {
      console.error(err);
      alert('Deu ruim na request')
    });
  };

  async function updateAccount() {
    if (!newPassword) {
      alert('Você não informou uma senha para salvar!');
      return;
    } else if (newPassword !== confirmPassword) {
      alert('As senhas dos campos nova senha e confirmar senha não conferem.');
      return;
    };

    const data = {
      newPassword,
      newName
    };

    await api.put('admin/1', data, {
      params: {
        oldPassword
      }
    }).then(async response => {
      if (response.status == 200) {
        if (rememberMe) {
          if (data.newName !== undefined && data.newName !== '') {
            await SecureStore.setItemAsync('user', `${data.newName}`);
            await SecureStore.setItemAsync('password', `${data.newPassword}`);
            alert('Dados atualizados com sucesso!');
            navigation.goBack();
            return;
          }
          await SecureStore.setItemAsync('password', `${data.newPassword}`);
          alert('Dados atualizados com sucesso!');
          navigation.goBack();
        }
        Alert.alert('Atenção', 'Por não ter ativado o lembre-me você foi levado para a tela de login novamente.');
        navigation.navigate('Login');
      };
    }).catch(error => {
      console.error(error);
      alert('Houve algum erro interno na requisição')
    });
  };

  useEffect(() => {
    getAdminData();
  }, []);

  function handleGoBack() {
    navigation.goBack()
  };

  return (
    <View style={[styles.container, { paddingTop: 0 }]}>
      <Header
        displayRightIcon
        leftButtonFunction={handleGoBack}
        rightButtonFunction={updateAccount}
        homeScreen={false}
      />
      <ScrollView style={[styles.container, { paddingTop: 50 }]} contentContainerStyle={{ alignItems: 'center' }}>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} onChangeText={text => setNewName(text)} placeholder={`Nome atual da conta: ${admin?.name}`} />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>Senha antiga</Text>
          <TextInput style={styles.input} onChangeText={text => setOldPassword(text)} placeholder='digite sua senha antiga' />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>Nova senha</Text>
          <TextInput style={styles.input} onChangeText={text => setNewPassword(text)} placeholder='Digite sua nova senha' />
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput style={styles.input} onChangeText={text => setConfirmPassword(text)} placeholder='confirme sua senha nova' />
          <View style={styles.rememberView}>
            <TouchableOpacity style={{ marginRight: 5 }} onPress={() => setRememberMe(!rememberMe)}>
              <FontAwesome name={rememberMe ? 'check-square' : 'square'} size={22} color={rememberMe ? colors.secondary[0] : colors.secondary[1]} />
            </TouchableOpacity>
            <Text style={styles.label}>
              Lembre-me
            </Text>
          </View>
        </View>

        <AppButton buttonText='Salvar' buttonFunction={updateAccount} />
      </ScrollView>
    </View>
  );
};

export default AccountConfig