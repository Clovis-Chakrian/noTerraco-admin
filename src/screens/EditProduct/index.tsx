import { View, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { PropsEditProduct } from '../../@types/routes';
import { IProduct } from '../../@types';
import * as SecureStore from 'expo-secure-store';
import Spinner from '../../components/Spinner';
import { Picker } from '../../components';
import { DisheForm, ExtraPortionForm, MainDisheForm, WineDisheForm } from '../../components/ProductsForms';

function EditProduct({ route, navigation }: PropsEditProduct) {
  const [productType, setProductType] = useState('');
  const [productSubtype, setProductSubtype] = useState('');
  const [img, setSelectedImg] = useState<ImagePicker.ImagePickerAsset>();
  const types = ['Entradinhas', 'Saladas, vegetarianos & veganos', 'Principais', 'Bebidas', 'Sobremesas', 'Porções extras', 'Vinhos', 'Pets'];
  const subtypes = {
    mainDishes: ['Executivo', 'Especial', 'Apenas para dois', 'Padrão'],
    drinks: ['Sem álcool', 'Cervejas', 'Whiskies', 'Drinks da casa', 'Outras bebidas'],
    countrys: ['Chile', 'Itália', 'Portugal']
  };
  const [product, setProduct] = useState<IProduct | any>();

  function handleDisheFormType(type: string) {
    switch (type) {
      case 'Principais':
        return <MainDisheForm
          type={productType ? productType : product.type}
          subtype={productSubtype ? productSubtype : product?.subtype}
          currentDescription={product.description}
          currentName={product.name}
          currentPrice={product.price}
          currentPriceForTwo={product.priceForTwo}
          currentImageUrl={product.imageUrl}
          edit={route.params.productId !== null}
          selectedProductId={route.params.productId}
        />

      case 'Entradinhas':
        return <DisheForm
          type={productType ? productType : product.type}
          currentDescription={product.description}
          currentName={product.name}
          currentPrice={product.price}
          currentImageUrl={product.imageUrl}
          edit={route.params.productId !== null}
          subtype={product.subtype}
          selectedProductId={route.params.productId}
        />

      case 'Porções extras':
        return <ExtraPortionForm
          type={productType ? productType : product.type}
          currentName={product.name}
          currentPrice={product.price}
          edit={route.params.productId !== null}
          selectedProductId={route.params.productId}
        />

      case 'Vinhos':
        return <WineDisheForm
          type={productType ? productType : product.type}
          subtype={productSubtype ? productSubtype : product?.subtype}
          currentName={product.name}
          currentPrice={product.price}
          currentPriceForTwo={product.priceForTwo}
          currentImageUrl={product.imageUrl}
          edit={route.params.productId !== null}
          selectedProductId={route.params.productId}
        />

      default:
        return <DisheForm
          type={productType ? productType : product.type}
          currentDescription={product.description}
          currentName={product.name}
          currentPrice={product.price}
          currentImageUrl={product.imageUrl}
          edit={route.params.productId !== null}
          subtype={product.subtype}
        />
    }
  };

  function showSubtypePicker(type: string) {
    switch (type) {
      case 'Principais':
        return true

      case 'Bebidas':
        return true

      case 'Vinhos':
        return true


      default:
        return false
    }
  };

  function handlSubtypeOptions(type: string) {
    switch (type) {
      case 'Principais':
        return subtypes.mainDishes

      case 'Bebidas':
        return subtypes.drinks

      case 'Vinhos':
        return subtypes.countrys

      default:
        return []
        break;
    }
  }

  async function loadProduct() {
    await api.get(`/product/${route.params.productId}`).then(res => {
      if (res.status == 200) {
        setProduct(res.data);
        console.log(res.data)
      };
    }).catch(err => {
      console.error(err);
      Alert.alert('Erro', 'Houve um erro interno, por favor tente abrir o produto novamente!');
    });
  };

  useEffect(() => {
    loadProduct();
  }, [])

  if (!product) {
    return (
      <Spinner />
    );
  } else {
    return (
      <KeyboardAvoidingView style={[styles.container, { paddingTop: 0 }]}>
        <ScrollView style={[styles.container]} contentContainerStyle={{ alignItems: 'center' }}>
          <Picker
            onSelectOption={option => {
              setProductType(option);
              setProductSubtype('Selecione a categoria')
            }}
            options={types}
            selectedOption={productType ? productType : product.type}
          />

          {
            showSubtypePicker(productType ? productType : product.type) &&
            <Picker
              onSelectOption={option => setProductSubtype(option)}
              options={handlSubtypeOptions(productType ? productType : product.type)}
              selectedOption={productSubtype ? productSubtype : product.subtype}
            />
          }

          {handleDisheFormType(productType ? productType : product.type)}
        </ScrollView >
      </KeyboardAvoidingView>
    );
  }
};

export default EditProduct;