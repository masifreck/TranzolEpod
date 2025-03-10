import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  primarycolor,
  secondarcolor,
  textcolor,
} from '../components/constant';
const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(getLoginDetails, 3000); // Wait for 3 seconds before checking login details
  }, []);

  const getLoginDetails = async () => {
    try {
      const success = await AsyncStorage.getItem('success'); // Retrieve the `success` key
      if (success === '"SUCCESS"') { // Check if the value matches the server response
        navigation.replace('Dashboard'); // Navigate to Dashboard if logged in
      } else {
        navigation.replace('login'); // Navigate to Login otherwise
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      navigation.replace('login'); // Fallback to Login if an error occurs
    }
  };

  return (
    <>
         <LinearGradient
                colors={[primarycolor, secondarcolor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1}}
              >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.upper}>
        <View
          style={{
            width: 130,
            height: 130,
            padding: 10,
            borderRadius: 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
        >
          <Image
            source={require('../assests/tranzol.png')}
            style={styles.logo}
          />
         
        </View>
        <Text style={{color:'white',fontSize:22,fontWeight:'bold',marginTop:10, fontFamily: 'PoppinsExtraBold'}}>TRACK ME</Text>
      </View>
      <View style={styles.lower}>
        <Text style={styles.tranzol}>Powered By Tranzol</Text>
      </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 60,
  },
  upper: {
    flex: 25,
    marginTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lower: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tranzol: {
    fontSize: 11,
    position: 'absolute',
    bottom: 30,
    letterSpacing: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight:'bold'
  },
});

export default Splash;