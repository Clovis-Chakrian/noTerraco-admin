import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { IDisheForm } from '../../../@types';
import api from '../../../services/api';
import AppButton from '../../AppButton';
import Input from '../../Inputs/Input';
import styles from './styles';
import Spinner from '../../Spinner';
import socket from '../../../services/socket';

const ExtraPortionForm: React.FC<IDisheForm> = ({
  type,
  currentName,
  currentPrice,
  edit,
  selectedProductId
}) => {
  const [name, setName] = useState(currentName);
  const [price, setPrice] = useState(currentPrice);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  async function handleCreateProduct() {
    setIsLoading(true);
    const data = {
      name,
      price: price?.replaceAll(',', '.'),
      type
    }

    await api.post('/product', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(resp => {
      if (resp.status !== 201) {
        const errorMessage = resp.data as { message: string }
        Alert.alert(`Erro - ${resp.status}`, errorMessage.message ? errorMessage.message : 'Houve um erro na aplicação. Tente novamente mais tarde.')
        setIsLoading(false);
        navigation.goBack();
      } else {
        Alert.alert('Item adicionado com sucesso!', resp.data.message);
        setIsLoading(false);
        socket.emit('hasUpdated');
        navigation.goBack();
      }
    }).catch((err: AxiosError) => {
      console.log(err);
      const errorMessage = err.response?.data as { message: string }
      Alert.alert(`Erro - ${err.status}`, errorMessage.message ? errorMessage.message : 'Houve um erro na aplicação. Tente novamente mais tarde.')
      setIsLoading(false);
      navigation.goBack();
    });
  };

  async function handleEditProduct() {
    setIsLoading(true);
    const data = {
      name,
      price: price?.replaceAll(',', '.'),
      type
    }

    await api.patch(`/product/${selectedProductId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(resp => {
      if (resp.status !== 200) {
        const errorMessage = resp.data as { message: string }
        Alert.alert(`Erro - ${resp.status}`, errorMessage.message ? errorMessage.message : 'Houve um erro na aplicação. Tente novamente mais tarde.')
        setIsLoading(false);
        navigation.goBack();
      } else {
        Alert.alert('Sucesso!', resp.data.message);
        setIsLoading(false);
        socket.emit('hasUpdated');
        navigation.goBack();
      }
    }).catch((err: AxiosError) => {
      console.log(err);
      const errorMessage = err.response?.data as { message: string }
      Alert.alert(`Erro - ${err.status}`, errorMessage.message ? errorMessage.message : 'Houve um erro na aplicação. Tente novamente mais tarde.')
      setIsLoading(false);
      navigation.goBack();
    });
  };

  if (isLoading) {
    return (
      <Spinner />
    );
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Input
          label='Nome do prato'
          initialValue={currentName}
          onChangeText={(text) => {
            setName(text)
          }}
          placeholder='Digite o nome do prato aqui'
        />

        <Input
          label='Preço'
          initialValue={currentPrice}
          onChangeText={(text) => {
            setPrice(text)
          }}
          placeholder='O preço dele aqui'
        />

        <AppButton
          buttonText={edit ? 'Atualizar' : 'Criar'}
          buttonFunction={edit ? handleEditProduct : handleCreateProduct }
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ExtraPortionForm;