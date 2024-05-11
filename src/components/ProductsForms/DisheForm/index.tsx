import { useState } from 'react';
import { Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import AppButton from '../../AppButton';
import ImageInput from '../../Inputs/ImageInput';
import Input from '../../Inputs/Input';
import MultilineInput from '../../Inputs/MultilineInput';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';
import { IDisheForm } from '../../../@types';
import api from '../../../services/api';
import { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import Spinner from '../../Spinner';
import socket from '../../../services/socket';

const DisheForm: React.FC<IDisheForm> = ({
  type,
  currentDescription,
  currentName,
  currentPrice,
  edit,
  subtype,
  currentImageUrl,
  selectedProductId
}) => {
  const [selectedImg, setSelectedImg] = useState<ImagePicker.ImagePickerAsset>();
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription);
  const [price, setPrice] = useState(currentPrice);
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()

  async function handleCreateProduct() {
    setIsLoading(true);
    const data = new FormData();
    data.append('image', {
      name: `${Date.now()}`,
      uri: selectedImg?.uri,
      type: 'image/*'
    } as any);
    data.append('name', name ? name : '');
    data.append('description', description ? description : '');
    data.append('type', type);
    if (subtype !== '' && subtype !== null && subtype !== undefined) {
      data.append('subtype', subtype);
    };
    data.append('price', price ? price.replaceAll(",", ".") : '');

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
    })
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
      data.append('description', description ? description : '');
      data.append('type', type);
      if (subtype !== '' && subtype !== null && subtype !== undefined) {
        data.append('subtype', subtype);
      };
      data.append('price', price ? price.replaceAll(',', '.') : '');

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
        console.log({
          err,
          code: err.code,
          resp: err.response,
          req: err.request,
          cause: err.cause,
          errName: err.name,
          message: err.message,
          status: err.status,
          config: err.config,
          stack: err.stack
        });
        const errorMessage = err.response?.data as { message: string }
        Alert.alert(`Erro - ${err.status}`, errorMessage ? `${errorMessage}` : 'Houve um erro na aplicação. Tente novamente mais tarde.')
        setIsLoading(false);
        navigation.goBack();
      });

      return;
    };

    data.append('name', name ? name : '');
    data.append('description', description ? description : '');
    data.append('type', type);
    if (subtype !== '' && subtype !== null && subtype !== undefined) {
      data.append('subtype', subtype);
    };
    data.append('price', price ? price.replaceAll(',', '.') : '');

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

        <Input
          label='Preço'
          onChangeText={(text) => {
            setPrice(text)
          }}
          placeholder='O preço dele aqui'
          initialValue={currentPrice}
        />

        <AppButton
          buttonText={edit ? 'Atualizar' : 'Criar'}
          buttonFunction={edit ? handleEditProduct : handleCreateProduct}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default DisheForm;