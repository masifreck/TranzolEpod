import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { reportList } from '../components/driverData';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
import { primarycolor,redcolor,secondarcolor, textcolor } from '../components/constant';
const DriverList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [drivers, setDrivers] = useState(reportList);
  

const shareText = async (message) => {
  try {
    const options = {
      message:'Check out this awesome driver tracking app!'// The text to share
    };
    await Share.open(options);
  } catch (error) {
    console.log('Error sharing:', error);
  }
};

// Example Usage:


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
                style={{borderBottomLeftRadius:20,justifyContent:'çenter',paddingBottom:10}}
              >
                <Text style={{margin:10,marginTop:50,color:'white',fontSize:18,marginLeft:20,fontWeight:'bold'}}>SEARCH BY NAME & MOBILE..</Text>
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
      scrollEnabled
        data={filteredDrivers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.driverCard,  {backgroundColor: item.id % 2 === 0 ? '#F8ECD9' : '#F8ECE8'}]}>
        
            <View>
              <Text style={styles.driverName}>{item.name}</Text>
              <Text style={styles.driverInfo}>📞 {item.mobile}</Text>
            </View>
               <TouchableOpacity onPress={shareText} style={[styles.tripButton, { backgroundColor: primarycolor }]}>
                                         <Icon name="share" size={20} color="white" />
                                         <Text style={styles.buttonText}>Share App</Text>
                                       </TouchableOpacity>
          </View>
        )}
      />

     
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
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    margin:10
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:textcolor
  },
  driverInfo: {
    fontSize: 14,
    color: 'gray',
    color:textcolor
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,marginLeft:5
  },
  
  tripButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
  },
 
});

export default DriverList;
