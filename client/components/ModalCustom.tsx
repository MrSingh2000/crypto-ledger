import { View, Text, Modal, Pressable, StyleSheet } from 'react-native'
import React, {useContext} from 'react'
import { Entypo } from '@expo/vector-icons';
import defaultContext from './context/context';


export default function ModalCustom({ isVisible, children, onClose }: {
  isVisible: boolean,
  children: any,
  onClose: any
}) {
  const { isBuy } = useContext(defaultContext);
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {isBuy ? "Add Transaction" : "Sell Assets"}
          </Text>
          <Pressable onPress={onClose}>
            {/* <MaterialIcons name="close" color="#fff" size={22} /> */}
            <Entypo name="cross" size={24} color="white" />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    height: 270,
    width: '99%',
    backgroundColor: '#E9EBF8',
    borderRadius: 18,
    position: 'absolute',
    top: '30%',
    alignSelf: 'center'
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
