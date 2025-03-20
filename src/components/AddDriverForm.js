import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, Alert } from 'react-native';
import { primarycolor, redcolor } from './constant';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library


const AddDriverForm = ({ visible, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddDriver = async () => {
    if (!name || !mobile || mobile.length !== 10) {
      Alert.alert('Validation Failed','Please enter both Name and a valid 10-digit Mobile Number');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://trackme.tranzol.com/Services/TrackMe/AddDriver/AddDriver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: name, MobileNo: mobile })
      });

      const result = await response.json();
      console.log(result);
      
      if (response.ok) {
        onAdd({ id: Date.now(), name, mobile });
        setName('');
        setMobile('');
        onClose();
        Alert.alert('successfuly','Add driver')
      } else {
        Alert.alert('Failed to add driver');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred');
    }
    setLoading(false);
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Driver</Text>
          <TextInput
            style={styles.input}
            placeholder="Driver Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile No"
            keyboardType="numeric"
            value={mobile}
            onChangeText={setMobile}
          />
         <TouchableOpacity style={styles.addButton} onPress={handleAddDriver} disabled={loading}>
  {loading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.addButtonText}>
      <Icon name="plus" size={16} color="#fff" /> Add Driver
    </Text>
  )}
</TouchableOpacity>

<TouchableOpacity style={styles.closeButton} onPress={onClose} disabled={loading}>
  <Text style={styles.closeButtonText}>
    <Icon name="close" size={16} color="#fff" /> Close
  </Text>
</TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: primarycolor,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: redcolor,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddDriverForm;
