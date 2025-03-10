import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { driversList } from '../components/driverData';
import AddDriverForm from '../components/AddDriverForm';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { primarycolor,redcolor,secondarcolor, textcolor } from '../components/constant';
const ManageDrivers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [drivers, setDrivers] = useState(driversList);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleStartTrip = (id) => {
    console.log(`Start trip for Driver ID: ${id}`);
  };

  const handleEndTrip = (id) => {
    console.log(`End trip for Driver ID: ${id}`);
  };

  const handleAddDriver = (newDriver) => {
    setDrivers([...drivers, newDriver]);
  };

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.mobile.includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
  <LinearGradient
                colors={[primarycolor, secondarcolor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingVertical:10,borderBottomLeftRadius:20,justifyContent:'çenter',marginBottom:10}}
              >
                <Text style={{margin:10,marginTop:40,color:'white',fontSize:18,marginLeft:20,fontWeight:'bold'}}>SEARCH BY NAME & MOBILE..</Text>
      <TextInput
      placeholderTextColor={textcolor}
        style={styles.searchBar}
        placeholder="Search by Name or Mobile No"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
</LinearGradient>
      {/* Driver List */}
      <FlatList
        data={filteredDrivers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.driverCard,  {backgroundColor: item.id % 2 === 0 ? '#F8ECD9' : '#F8ECE8'}]}>
            <View>
              <Text style={styles.driverName}>{item.name}</Text>
              <Text style={styles.driverInfo}>📞 {item.mobile}</Text>
           
            </View>
            <View style={{flexDirection:'column',gap:5}}>
              <TouchableOpacity style={[styles.tripButton, { backgroundColor: primarycolor }]}>
                             <Icon name="play-circle-outline" size={20} color="white" />
                             <Text style={styles.buttonText}>Start Trip</Text>
                           </TouchableOpacity>
                 <TouchableOpacity style={[styles.tripButton, { backgroundColor: redcolor }]}>
                              <Icon name="stop-circle" size={20} color="white" />
                              <Text style={styles.buttonText}>End Trip</Text>
                            </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Floating Plus Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Add Driver Form Modal */}
      <AddDriverForm visible={isModalVisible} onClose={() => setModalVisible(false)} onAdd={handleAddDriver} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    
    marginHorizontal:10,
    backgroundColor:'white',
    color:'black'
  },
  driverCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical:5,
    borderRadius: 8,
    
    elevation: 3,
    marginHorizontal:10, marginVertical:2
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:textcolor
  },
  driverInfo: {
    fontSize: 14,
    color: 'gray',
    color:textcolor,marginTop:10,fontWeight:'bold'
  },
  button: {
    backgroundColor: primarycolor,
    padding: 8,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,marginLeft:5
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: primarycolor,
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  tripButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,paddingVertical:2,
    borderRadius: 5,
  },
});

export default ManageDrivers;
