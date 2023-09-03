import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import styles from './styles';
import { colors } from '../../styles';
import { IPicker } from '../../@types/components';

const Picker: React.FC<IPicker> = ({
  options,
  onSelectOption,
  selectedOption
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <Modal transparent visible={showModal} animationType='slide'>
        <View style={[styles.pickerContainer, styles.modal]}>

          <View style={styles.optionsView}>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Ionicons name='arrow-back-outline' color={colors.primary[1]} size={24} />
            </TouchableOpacity>

            {
              options.map(option => {
                return (
                  <TouchableOpacity key={option} onPress={() => {
                    onSelectOption(option);
                    setShowModal(false)
                  }} style={styles.optionButton}>
                    <Text style={styles.text}>{option}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.openPickerButton} onPress={() => setShowModal(true)}>
        <Text style={[styles.text, styles.currentOptionLabel]}>{selectedOption}</Text>
        <Ionicons name='chevron-down' size={24} color={colors.primary[1]} />
      </TouchableOpacity>
    </View>
  );
};

export default Picker;