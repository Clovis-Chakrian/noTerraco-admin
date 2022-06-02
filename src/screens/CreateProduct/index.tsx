import { Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Header from '../../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import { useState } from 'react';
import { colors, fonts } from '../../styles';
import AppButton from '../../components/AppButton';
import api from '../../services/api';
import { PropsCreateProduct } from '../../@types/routes';

function CreateProduct({ navigation, route }: PropsCreateProduct) {
  const [productType, setProductType] = useState('Entradinhas');
  const [productSubtype, setProductSubtype] = useState('Saladas');
  const [img, setSelectedImg] = useState<string | undefined>('');
  const pickerValues = ['Entradinhas', 'Saladas, vegetarianos & veganos', 'Principais', 'Bebidas', 'Sobremesas', 'Porções extras', 'Pets'];
  const subtypes = {
    drinks: ['Sem álcool', 'Cervejas', 'Whiskies', 'Outras bebidas'],
    salads: ['Saladas', 'Vegetarianos', 'Veganos']
  };
  const [productName, setProductName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [memory, setMemory] = useState<string>('');
  const [descriptionLength, setDescrptionLength] = useState<number>(0);
  const [memoryLength, setMemoryLength] = useState<number>(0);

  function handleGoBack() {
    navigation.goBack();
  };

  async function createProduct() {
    if (description.length > 182 || memoryLength > 180) {
      Alert.alert('Atenção!', 'Você está ultrapassando os limites de caracteres.');
      return;
    };

    const data = {
      name: productName,
      type: productType,
      subtype: productSubtype,
      description: description,
      memory: memory,
      image: 'data:image/jpeg;base64,' + img,
      price: Number(price),
      availability: true
    };

    await api.post('/product', {
      ...data
    });

    navigation.goBack();
  };

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Atenção!', 'A permissão para acessar a galeria/câmera é necessária para o funcionamento do app!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [245, 245],
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (pickerResult.cancelled) return;

    setSelectedImg(pickerResult.base64)
  }

  return (
    <View style={[styles.container, { paddingTop: 0 }]}>
      <Header
        displayRightIcon
        rightButtonFunction={createProduct}
        leftButtonFunction={handleGoBack}
        homeScreen={false}
      />
      <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
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

        <View style={[styles.picker, { display: productType === 'Bebidas' || productType === 'Saladas, vegetarianos & veganos' ? 'flex' : 'none' }]}>
          <Picker
            selectedValue={productSubtype}
            onValueChange={(itemValue, itemIndex) => {
              setProductSubtype(itemValue);
            }}
            dropdownIconColor={colors.primary[1]}
          >
            {productType === 'Bebidas' ?
              subtypes.drinks.map(value => {
                return <Picker.Item key={value} style={styles.pickerItem} fontFamily={fonts.fontFamilyBold} label={value} value={value} />
              })
              :
              subtypes.salads.map(value => {
                return <Picker.Item key={value} style={styles.pickerItem} fontFamily={fonts.fontFamilyBold} label={value} value={value} />
              })
            }
          </Picker>
        </View>

        <View style={[styles.inputView, { display: productType === 'Porções extras' || productType === 'Pets' ? 'none' : 'flex' }]}>
          <Text style={styles.label}>Selecione uma imagem</Text>
          <TouchableOpacity style={styles.imageInput} onPress={openImagePickerAsync}>
            {img == ''
              ?
              <Image style={styles.imageInput} source={require('../../assets/placeHolderImage.png')} />
              :
              <Image style={styles.imageInput} source={{ uri: 'data:image/jpeg;base64,' + img }} />
            }
          </TouchableOpacity>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.label} >Nome do prato</Text>
          <TextInput style={styles.input} placeholder='Nome do prato' onChangeText={text => setProductName(text)} />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.label}>Preço</Text>
          <TextInput style={styles.input} placeholder='25,00' keyboardType='number-pad' onChangeText={text => setPrice(text)} />
        </View>

        <View style={[styles.inputView, { display: productType === 'Porções extras' ? 'none' : 'flex' }]}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput style={styles.multilineInput} multiline onChangeText={text => {
            setDescription(text);
            setDescrptionLength(text.length);
          }} textAlignVertical='top' placeholder='Pasteis de carne...' />
          <Text style={[styles.text, { color: descriptionLength > 182 ? '#F00' : colors.secondary[0], alignSelf: 'flex-end' }]}>{descriptionLength}/182</Text>
        </View>

        <View style={[styles.inputView, { display: productType === 'Porções extras' || productType === 'Pets' ? 'none' : 'flex' }]}>
          <Text style={styles.label}>Descrição do nome do prato</Text>
          <TextInput style={styles.multilineInput} multiline onChangeText={text => {
            setMemory(text);
            setMemoryLength(text.length);
          }} textAlignVertical='top' placeholder='A inspiração desse prato foi um ex chefe meu...' />
          <Text style={[styles.text, { color: memoryLength > 180 ? '#F00' : colors.secondary[0], alignSelf: 'flex-end' }]}>{memoryLength}/180</Text>
        </View>

        <View style={{ marginVertical: 20 }}>
          <AppButton buttonText='Salvar' buttonFunction={createProduct} />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateProduct;