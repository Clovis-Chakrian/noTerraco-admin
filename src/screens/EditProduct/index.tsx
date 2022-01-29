import { Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Header from '../../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useEffect, useState } from 'react';
import { colors, fonts } from '../../styles';
import AppButton from '../../components/AppButton';
import api from '../../services/api';
import { PropsEditProduct } from '../../@types/routes';
import IProduct from '../../@types/interfaces';
import * as SecureStore from 'expo-secure-store';
import Spinner from '../../components/Spinner';

function EditProduct({ route, navigation }: PropsEditProduct) {
  const [productType, setProductType] = useState('');
  const [img, setSelectedImg] = useState<string | undefined>('');
  const pickerValues = ['Entradinhas', 'Saladas, vegetarianos & veganos', 'Principais', 'Bebidas', 'Sobremesas', 'Porções extras'];
  const [productName, setProductName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [descriptionLength, setDescrptionLength] = useState<number>(0);
  const [product, setProduct] = useState<IProduct>();

  async function loadProduct() {
    await api.get(`/product/${route.params.productId}`).then(res => {
      if (res.status == 200) {
        setProduct(res.data);
      };
    }).catch(err => {
      console.error(err);
      Alert.alert('Erro', 'Houve um erro interno, por favor tente abrir o produto novamente!');
    });
  };

  async function updateProductInfo() {
    const user = await SecureStore.getItemAsync('user').catch(err => {
      Alert.alert('Erro de autenticação!', 'Você não salvou suas credenciais na tela de login ou ao atualizar suas credenciais. Por favor, faça login novamente para completar suas ações!')
      return;
    });
    const password = await SecureStore.getItemAsync('password').catch(err => {
      Alert.alert('Erro de autenticação!', 'Você não salvou suas credenciais na tela de login ou ao atualizar suas credenciais. Por favor, faça login novamente para completar suas ações!')
      return;
    });

    const data = {
      name: productName,
      type: productType,
      description: description,
      image: img,
      price: Number(price),
      availability: product?.availability
    };

    await api.put(`/product/${route.params.productId}`, {
      ...data
    }, {
      params: {
        userName: user,
        password: password
      }
    }).then(res => {
      if (res.status == 200) navigation.goBack();
    }).catch(err => {
      Alert.alert('Erro', 'Não foi possível atualizar o produto. Por favor tente novamente.')
    });
  }

  useEffect(() => {
    loadProduct();
    //setProductType(`${product?.type}`)
  }, [])

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Atenção!', 'A permissão para acessar a galeria/câmera é necessária para o funcionamento do app!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (pickerResult.cancelled) return;

    setSelectedImg(pickerResult.base64)
  }

  function handleGoBack() {
    if (productName !== '' || price !== '' || description !== '') {
      Alert.alert('Atenção', 'Você tem certeza que deseja sair sem atualizar o produto?', [
        {
          text: 'Não',
          onPress: () => { return },
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => {
            navigation.goBack();
          },
          style: 'cancel'
        }
      ])
    } else {
      navigation.goBack()
    };
  };

  if (!product) {
    return (
      <Spinner />
    );
  } else {
    return (
      <View style={[styles.container, { paddingTop: 0 }]}>
        <Header
          homeScreen={false}
          rightButtonFunction={updateProductInfo}
          leftButtonFunction={handleGoBack}
          displayRightIcon
        />
        <ScrollView style={[styles.container]} contentContainerStyle={{ alignItems: 'center' }}>
          <View style={styles.picker}>
            <Picker
              selectedValue={productType}
              onValueChange={(itemValue, itemIndex) => {
                setProductType(itemValue);
              }}
              dropdownIconColor={colors.primary[1]}
            >
              {pickerValues.map(value => {
                return <Picker.Item key={value} style={styles.pickerItem} fontFamily={fonts.fontFamilyBold} label={value} value={value} />
              })}
            </Picker>
          </View>

          <View style={styles.inputView}>
            <Text style={styles.label} >Nome do prato</Text>
            <TextInput style={styles.input} placeholder={product?.name ? product.name : 'Nome do prato'} onChangeText={text => setProductName(text)} />
          </View>

          <View style={[styles.inputView, { display: productType === 'Porções extras' ? 'none' : 'flex'}]}>
            <Text style={styles.label}>Selecione uma imagem</Text>
            <TouchableOpacity style={styles.imageInput} onPress={openImagePickerAsync}>
              {img ? <Image style={styles.imageInput} source={{ uri: 'data:image/jpeg;base64,' + img }} /> : <Image style={styles.imageInput} source={{ uri: product.imageUrl }} />}
            </TouchableOpacity>
          </View>

          <View style={[styles.inputView, { display: productType === 'Porções extras' ? 'none' : 'flex'}]}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput style={styles.multilineInput} multiline onChangeText={text => {
              setDescription(text);
              setDescrptionLength(text.length);
            }} textAlignVertical='top' placeholder={product?.description ? product.description : 'Pasteis de carne...'} />
            <Text style={[styles.text, { color: descriptionLength > 250 ? '#F00' : colors.secondary[0], alignSelf: 'flex-end' }]}>{descriptionLength}/250</Text>
          </View>

          <View style={styles.inputView}>
            <Text style={styles.label}>Preço</Text>
            <TextInput style={styles.input} placeholder={product?.price ? `${product.price}` : '25,00'} onChangeText={text => setPrice(text)} />
          </View>

          <View style={{ marginVertical: 20 }}>
            <AppButton buttonText='Salvar' buttonFunction={updateProductInfo} />
          </View>
        </ScrollView >
      </View>
    );
  }
};

export default EditProduct;