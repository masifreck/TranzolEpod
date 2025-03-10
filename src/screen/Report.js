import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { reportList } from '../components/driverData';
import LinearGradient from 'react-native-linear-gradient';
import { primarycolor,redcolor,secondarcolor, textcolor } from '../components/constant';
const Report = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [drivers, setDrivers] = useState(reportList);
  
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
                style={{ borderBottomLeftRadius:20,justifyContent:'çenter',marginBottom:10}}
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
                <Image style={{width:150,height:100}} source={require('../assests/driver.png')}/>
            </View>
            <View>
              <Text style={styles.driverName}>{item.name}</Text>
              <Text style={styles.driverInfo}>📞 {item.mobile}</Text>
<Text style={styles.driverInfo}>🚗 Start Trip: {item.startTime}</Text>
<Text style={styles.driverInfo}>🏁 End Trip :{item.endTime}</Text>

           
            </View>
            
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
    paddingHorizontal: 15,
    paddingVertical:5,
    borderRadius: 8,
    elevation: 3,
    marginHorizontal:10,marginVertical:2
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
 
 
});

export default Report;
