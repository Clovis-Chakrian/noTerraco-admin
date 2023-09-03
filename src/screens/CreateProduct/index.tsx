import { View, ScrollView } from 'react-native'
import styles from './styles';
import { useState } from 'react';
import { Picker } from '../../components';
import { DisheForm, ExtraPortionForm, MainDisheForm, WineDisheForm } from '../../components/ProductsForms';

function CreateProduct() {
  const types = ['Entradinhas', 'Saladas, vegetarianos & veganos', 'Principais', 'Bebidas', 'Sobremesas', 'Porções extras', 'Pets', 'Vinhos'];
  const subtypes = {
    salads: ['Saladas', 'Vegetarianos', 'Veganos'],
    mainDishes: ['Executivo', 'Especial', 'Apenas para dois', 'Padrão'],
    drinks: ['Sem álcool', 'Cervejas', 'Whiskies', 'Drinks da casa', 'Outras bebidas'],
    countrys: ['Chile', 'Itália', 'Portugal']
  };
  const [selectedType, setSelectedType] = useState('Entradinhas');
  const [selectedSubtype, setSelectedSubtype] = useState('Selecione a categoria');

  function showSubtypePicker(type: string) {
    switch (type) {
      case 'Saladas, vegetarianos & veganos':
        return true

      case 'Principais':
        return true

      case 'Bebidas':
        return true

      case 'Vinhos':
        return true


      default:
        return false
        break;
    }
  };

  function handlSubtypeOptions(type: string) {
    switch (type) {
      case 'Saladas, vegetarianos & veganos':
        return subtypes.salads

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

  function handleDisheFormType(type: string) {
    switch (type) {
      case 'Principais':
        return <MainDisheForm type={selectedType} subtype={selectedSubtype} />

      case 'Entradinhas':
        return <DisheForm type={selectedType} />

      case 'Porções extras':
        return <ExtraPortionForm type={selectedType} />

      case 'Vinhos':
        return <WineDisheForm type={selectedType} subtype={selectedSubtype} />

      default:
        return <DisheForm type={selectedType} subtype={selectedSubtype}/>
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
      <Picker
        options={types}
        selectedOption={selectedType}
        onSelectOption={option => {
          setSelectedType(option);
          setSelectedSubtype('Selecione a categoria')
        }}
      />

      {
        showSubtypePicker(selectedType) &&
        <Picker
          options={handlSubtypeOptions(selectedType)}
          selectedOption={selectedSubtype}
          onSelectOption={option => setSelectedSubtype(option)}
        />
      }

      {
        handleDisheFormType(selectedType)
      }
    </ScrollView>
  );
}

export default CreateProduct;