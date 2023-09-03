import { ScrollView, View, Text, TextInput, Dimensions, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../styles';
import styles from './styles';
import { Picker } from '../../components';
import { useEffect, useState, useCallback } from 'react';
import { IProduct } from '../../@types';
import api from '../../services/api';
import { PropsHome } from '../../@types/routes';
import * as SecureStore from 'expo-secure-store';
import Spinner from '../../components/Spinner';
import { useFocusEffect } from '@react-navigation/native';
import {
  WineCard,
  DisheCard,
  ExtraPortionCard,
  MainDisheCard
} from '../../components/ProductCard';
import socket from '../../services/socket';

function Home({ route, navigation }: PropsHome) {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [selectedType, setSelectedType] = useState<string>('Entradinhas');
  const pickerValues = ['Entradinhas', 'Saladas, vegetarianos & veganos', 'Principais', 'Bebidas', 'Sobremesas', 'Porções extras', 'Pets', 'Vinhos'];
  const [products, setProducts] = useState<IProduct[]>([]);

  async function loadProducts() {
    await api.get('/products').then(res => {
      if (res.status == 200) {
        const products: IProduct[] = res.data;
        setProducts(res.data);
        setFilteredProducts(products.filter(product => product.type.includes(selectedType)));
      }
    }).catch(err => {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível carregar os dados, por favor tente novamente.');
    });
  };

  function handleSearchProducts() {
    if (search) {
      setFilteredProducts(products.filter(product => product.name.includes(search) && product.type.includes(selectedType)))
    } else {
      setFilteredProducts(products.filter(product => product.type.includes(selectedType)))
    }
  };

  // function handleGoToAccountConfig() {
  //   navigation.navigate('AccountConfig');
  // };

  async function handleProductAvailability(id: string, currentAvailability: boolean) {
    const availability = !currentAvailability;
    await api.patch(`/product/${id}`, {
      availability
    }).then(response => {
      if (response.status === 200) {
        Alert.alert('Sucesso!', `Disponibilidade alterada com sucesso!`);
        socket.emit('hasUpdated');
        loadProducts();
      };
    }).catch(error => {
      console.log(error);
      Alert.alert('Erro', 'Houve algum erro interno')
    });
  };

  async function deleteProduct(id: string, productName: string) {
    Alert.alert(
      'Atenção!',
      `Você deseja realmente deletar o ${productName}?`,
      [
        {
          text: "Cancelar",
          onPress: () => { return },
          style: 'cancel'
        },
        {
          text: "Sim",
          onPress: async () => {
            await api.delete(`/product/${id}`).then(response => {
              if (response.status == 200) {
                Alert.alert('Sucesso!', `${productName} deletado com sucesso!`);
                socket.emit('hasUpdated');
                loadProducts();
              };
            }).catch(error => {
              console.error(error);
              Alert.alert('Erro', 'Ocorreu um erro com sua solicitação! :(')
            });
          },
        }
      ]
    );
  };

  function handleGoToEditProduct(productId: string) {
    navigation.navigate('EditProduct', {
      productId
    });
  };

  function handleShowProducts(type: string) {
    return filteredProducts.map((product: IProduct) => {
      switch (type) {
        case 'Principais':
          return <MainDisheCard
            key={product.id}
            subtype={product.subtype || ''}
            type={product.type}
            imageUrl={product.imageUrl}
            name={product.name}
            description={product?.description || ''}
            avaibility={product.availability}
            price={`${product.price}`}
            priceForTwo={`${product.priceForTwo}`}
            avaibilityFunction={() => handleProductAvailability(product.id, product.availability)}
            editFunction={() => handleGoToEditProduct(product.id)}
            deleteFunction={() => deleteProduct(product.id, product.name)}
          />

        case 'Porções extras':
          return <ExtraPortionCard
            type={product.type}
            key={product.id}
            name={product.name}
            avaibility={product.availability}
            price={`${product.price}`}
            avaibilityFunction={() => handleProductAvailability(product.id, product.availability)}
            editFunction={() => handleGoToEditProduct(product.id)}
            deleteFunction={() => deleteProduct(product.id, product.name)}
          />

        case 'Vinhos':
          return <WineCard
            key={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            subtype={product.subtype || ''}
            type={product.type}
            avaibility={product.availability}
            price={`${product.price}`}
            priceForTwo={`${product.priceForTwo}`}
            avaibilityFunction={() => handleProductAvailability(product.id, product.availability)}
            editFunction={() => handleGoToEditProduct(product.id)}
            deleteFunction={() => deleteProduct(product.id, product.name)}
          />

        default:
          return <DisheCard
            key={product.id}
            imageUrl={product.imageUrl}
            type={product.type}
            name={product.name}
            description={product?.description || ''}
            avaibility={product.availability}
            price={`${product.price}`}
            avaibilityFunction={() => handleProductAvailability(product.id, product.availability)}
            editFunction={() => handleGoToEditProduct(product.id)}
            deleteFunction={() => deleteProduct(product.id, product.name)}
          />
      }
    })
  }

  useEffect(() => {
    handleSearchProducts();
  }, [search, selectedType])

  useFocusEffect(
    useCallback(() => {
      loadProducts();
      setSelectedType(selectedType);
    }, [])
  );

  useEffect(() => {
    navigation.addListener('beforeRemove', event => {
      event.preventDefault();
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
      <View style={styles.searchView}>
        <TextInput style={styles.searchInput} placeholder="Digite o nome de um prato aqui..." onChangeText={text => setSearch(text)} />
        <View style={styles.searchButtonView}>
          <TouchableOpacity>
            <FontAwesome name='search' size={28} color={colors.primary[1]} />
          </TouchableOpacity>
        </View>
      </View>

      <Picker
        onSelectOption={option => setSelectedType(option)}
        options={pickerValues}
        selectedOption={selectedType}
      />

      {
        handleShowProducts(selectedType)
      }
    </ScrollView>
  );
};

export default Home;