import { ScrollView, View, Text, TextInput, Dimensions, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { FontAwesome } from '@expo/vector-icons';
import { colors, fonts } from '../../styles';
import styles from './styles';
import { useEffect, useState } from 'react';
import IProduct from '../../@types/interfaces';
import api from '../../services/api';
import { PropsHome } from '../../@types/routes';

function Home({ route, navigation }: PropsHome) {
  const [search, setSearch] = useState<string>();
  const [selectedValue, setSelectedValue] = useState<string>('Entradinhas');
  const pickerValues = ['Entradinhas', 'Saladas, vegetarianos & veganos', 'Principais', 'Bebidas', 'Sobremesas', 'Porções extras'];
  const [products, setProducts] = useState([]);

  async function loadProducts() {
    await api.get('/products', {
      params: {
        type: selectedValue,
        name: ''
      }
    }).then(res => {
      if (res.status == 200) {
        setProducts(res.data);
      }
    }).catch(err => {
      console.error(err);
      alert('Deu merda lá');
    });
  };

  async function searchProduct() {
    await api.get('/products', {
      params: {
        type: selectedValue,
        name: search
      }
    }).then(res => {
      if (res.status == 200) {
        setProducts(res.data);
        console.log(res.data)
      }
    }).catch(err => {
      console.error(err);
      alert('Deu merda lá');
    });
  };

  function handleNavigateToCreateProduct() {
    navigation.navigate('CreateProduct');
  };

  function handleGoToAccountConfig() {
    navigation.navigate('AccountConfig');
  };

  async function handleProductAvailability(id: number, currentAvailability: boolean, price: number) {
    const availability = !currentAvailability;
    await api.put(`/product/${id}`, {
      availability: availability,
      price: price
    }, {
      params: {
        userName: 'Clóvis',
        password: '88683250'
      }
    }).then(response => {
      if (response.status == 200) {
        alert(`Disponibilidade alterada com sucesso!`);
        loadProducts();
      };
    }).catch(error => {
      console.log(error);
      alert('Houve algum erro interno')
    });
  };

  async function deleteProduct(id: number, productName: string) {
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
            await api.delete(`/product/${id}`, {
              params: {
                userName: 'Clóvis',
                password: '88683250'
              }
            }).then(response => {
              if (response.status == 200) {
                Alert.alert('Sucesso!', `${productName} deletado com sucesso!`);
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

  function handleGoToEditProduct(productId: number) {
    navigation.navigate('EditProduct', {
      productId
    });
  };

  useEffect(() => {
    loadProducts();
  }, [selectedValue])

  useEffect(() => {
    navigation.addListener('beforeRemove', event => {
      event.preventDefault();
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary[0] }}>
      <Header
        displayRightIcon
        homeScreen
        leftButtonFunction={handleGoToAccountConfig}
        rightButtonFunction={handleNavigateToCreateProduct}
      />
      <ScrollView style={[styles.container, { flex: 1, height: Dimensions.get('window').height * 3 }]} contentContainerStyle={{ alignItems: 'center' }}>
        <View style={styles.searchView}>
          <TextInput style={[styles.input, styles.searchInput]} onChangeText={text => setSearch(text)} />
          <View style={styles.searchButtonView}>
            <TouchableOpacity onPress={searchProduct}>
              <FontAwesome name='search' size={28} color={colors.primary[1]} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue(itemValue);
            }}
            dropdownIconColor={colors.primary[1]}
          >
            {pickerValues.map(value => {
              return <Picker.Item key={value} style={styles.pickerItem} fontFamily={fonts.fontFamilyBold} label={value} value={value} />
            })}
          </Picker>
        </View>

        {products.map((product: IProduct) => {
          return <ProductCard
            key={product.id}
            image={product.imageUrl}
            title={product.name}
            description={product.description}
            avaibility={product.availability}
            price={`${product.price}`}
            priceForTwo={`${product.priceForTwo}`}
            avaibilityFunction={() => handleProductAvailability(product.id, product.availability, product.price)}
            editFunction={() => handleGoToEditProduct(product.id)}
            deleteFunction={() => deleteProduct(product.id, product.name)}
          />
        })}
      </ScrollView>
    </View>
  );
};

export default Home;