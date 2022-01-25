import { View, Text, Image, TextInput } from 'react-native';
import AppButton from '../../components/AppButton';
import { useEffect, useState } from 'react';
import styles from './styles';
import api from '../../services/api';

const Logo = require('../../assets/logo.png')

interface ApiOBJ {
  id: number,
  name: string,
  password: string,
  accountType: string
};

function Login() {
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [response, setResponse] = useState<string>();

  async function reqTeste(username: string | undefined, userpass: string | undefined) {
    await api.get('/login', {
      params: {
        userName: username,
        password: userpass
      }
    }).then(res => {
      if (res.status == 200) {
        setResponse('Tudo certo');
        
      }
    }).catch(err => {
      alert('Usuário ou senha incorretos')
      setResponse('Deu merda lá ein')
      console.error(err)
    });
  };

  return (
    <View style={[styles.container, { alignItems: 'center' }]}>
      <View >
        <Image source={Logo} style={styles.image}/>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Entrar</Text>
      </View>

      <View style={styles.inputView}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} placeholder='Nome' onChangeText={text => setName(text)} />

        <Text style={[styles.label, { marginTop: 20 }]}>Senha</Text>
        <TextInput style={styles.input} secureTextEntry caretHidden placeholder='Senha' onChangeText={text => setPassword(text)} />

        <View style={{ alignSelf: 'flex-end' }}>
          <Text style={styles.label}>
            Lembre-me
          </Text>
        </View>
      </View>

      <View style={styles.buttonView}>
        <AppButton buttonText='Entrar' buttonFunction={() => reqTeste(name, password)} />
      </View>
    </View>
  );
};

export default Login;