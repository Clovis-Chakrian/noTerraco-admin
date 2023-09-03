import { useState } from 'react';
import { View, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import AppButton from '../../AppButton';
import HalfInput from '../../Inputs/HalfInput';
import ImageInput from '../../Inputs/ImageInput';
import Input from '../../Inputs/Input';
import MultilineInput from '../../Inputs/MultilineInput';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import { IMainDisheForm } from '../../../@types/components';
import api from '../../../services/api';
import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import Spinner from '../../Spinner';
import socket from '../../../services/socket';

const MainDisheForm: React.FC<IMainDisheForm> = ({
  type,
  subtype,
  currentDescription,
  currentName,
  currentPrice,
  currentPriceForTwo,
  currentImageUrl,
  selectedProductId,
  edit
}) => {
  const [selectedImg, setSelectedImg] = useState<ImagePicker.ImagePickerAsset>();
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription);
  const [price, setPrice] = useState(currentPrice);
  const [priceForTwo, setPriceForTwo] = useState(currentPriceForTwo);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  async function handleCreateProduct() {
    setIsLoading(true);
    const data = new FormData();
    data.append('image', {
      name: `${Date.now()}`,
      uri: selectedImg?.uri,
      type: 'image/*'
    } as any);
    data.append('name', name ? name : '');
    data.append('description', description ? description : '')
    data.append('type', type);
    data.append('subtype', subtype);
    data.append('price', price ? price : '');
    data.append('priceForTwo', priceForTwo ? priceForTwo : String((Number(price) * 0.7 + Number(price)).toFixed(2)));

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

  }

  async function handleEditProduct() {
    setIsLoading(true);
    const data = new FormData();
    if (selectedImg?.uri) {
      data.append('image', {
        name: `${Date.now()}`,
        uri: selectedImg?.uri,
        type: 'image/jpeg'
      } as any);
      data.append('name', name ? name : '');
      data.append('description', description ? description : '')
      data.append('type', type);
      data.append('subtype', subtype);
      data.append('price', price ? price : '');
      data.append('priceForTwo', priceForTwo ? priceForTwo : String((Number(price) * 0.7 + Number(price)).toFixed(2)));

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

      return;
    };

    data.append('name', name ? name : '');
    data.append('description', description ? description : '')
    data.append('type', type);
    data.append('subtype', subtype);
    data.append('price', price ? price.replace(',', '.') : '');
    data.append('priceForTwo', priceForTwo ? priceForTwo.replace(',', '.') : String((Number(price?.replace(',', '.')) * 0.7 + Number(price?.replace(',', '.'))).toFixed(2)));

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
    })
  };

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Atenção!', 'A permissão para acessar a galeria/câmera é necessária para o funcionamento do app!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [245, 245],
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (pickerResult.canceled) return;

    setSelectedImg(pickerResult.assets[0])
  }

  if (isLoading) {
    return (
      <Spinner />
    );
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ImageInput
          icon='add-circle-outline'
          label='Selecione a imagem'
          onPressFunction={openImagePickerAsync}
          uri={selectedImg?.uri ? selectedImg?.uri : currentImageUrl}
        />

        <Input
          label='Nome do prato'
          onChangeText={(text) => {
            setName(text)
          }}
          placeholder='Digite o nome do prato aqui'
          initialValue={currentName}
        />

        <MultilineInput
          label='Descrição do prato'
          onChangeText={(text) => {
            setDescription(text)
          }}
          placeholder='A descrição do prato aqui'
          initialValue={currentDescription}
        />

        <View style={styles.pricesView}>
          <HalfInput
            label='Preço p/ 1'
            onChangeText={(text) => {
              setPrice(text)
            }}
            placeholder="Valor do preço para 1"
            initialValue={price}
          />

          <HalfInput
            label='Preço p/ 2'
            onChangeText={(text) => {
              setPriceForTwo(text)
            }}
            placeholder={price ? String(Number(Number(price.replace(',', '.')) * 0.7 + Number(price.replace(',', '.'))).toFixed(2)) : ''}
            initialValue={priceForTwo}
          />
        </View>

        <AppButton
          buttonText={edit ? 'Atualizar' : 'Criar'}
          buttonFunction={edit ? handleEditProduct : handleCreateProduct}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default MainDisheForm;