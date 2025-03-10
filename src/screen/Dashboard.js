import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  
} from 'react-native';
// import Header from '../Components/Header';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { primarycolor, screenWidth, secondarcolor, textcolor } from '../components/constant';
const Dashboard = ({navigation}) => {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('success'); // Remove only the specific key
      navigation.navigate('login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  return (
   
    <LinearGradient 
    colors={[primarycolor,secondarcolor]}
    start={{x:0,y:0}}
    end={{x:1,y:0}}
    style={styles.container}
    >
      <View>
        <StatusBar translucent backgroundColor="transparent" />
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerFirst}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                width: '100%',
                // backgroundColor: 'red',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: '100%',
                }}>
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: 'contain',
                    //backgroundColor: 'white',
                    borderRadius: 5,
                  }}
                  source={require('../assests/tranzol.png')}
                  alt="logo"
                />
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: 'PoppinsExtraBold',
                    color: '#fff',
                    marginLeft: '5%',
                    letterSpacing: 1,fontWeight:'bold'
                  }}>
                  TRANZOL
                </Text>
               
              </View>
              <TouchableOpacity onPress={logout} style={{position:'absolute',right:20}}>
                  <Icon name='logout' size={35} color="white"/>
                </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                  position: 'absolute',
                  top: 0,
                  right: 20,
                  // backgroundColor: 'green',
                  height: '100%',
                }}>
             
              </View>
            </View>
            <View
              style={{
                flex: 10,
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: '100%',
                marginLeft: '5%',
              }}>
            
              <Text
                style={{
                  fontFamily: 'PoppinsBold',
                  fontSize: 30,
                  color: '#fff',
                  letterSpacing: 2,marginLeft:10,marginTop:20,marginBottom:10,fontWeight:'bold'
                }}>
                DASHBOARD
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1.5,
              width:screenWidth,
              height: '100%',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginTop:0,
            }}>
            <View style={{flex: 0}}>
            </View>
            <View style={styles.content}>
              <View
                style={{
                  justifyContent: 'space-evenly',
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    width: '80%',
                    height: 100,
                    // aspectRatio: 1,
                    backgroundColor: '#fefbf0',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 5,

                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 14,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    navigation.navigate('driverlist');
                  }}>
                  <Image
                    source={require('../assests/driver.png')}
                    style={styles.logoConsignment}
                  />
                  <Text style={styles.boxtext}>Driver List</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: 'space-evenly',
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={{
                    width: '80%',
                    height: 100,
                    // aspectRatio: 1,
                    backgroundColor: '#fefbf0',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 5,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 14,
                    flexDirection: 'row',
                    marginBottom:-40
                  }}
                  onPress={() => {
                    navigation.navigate('managedriver');
                  }}>
                  <Image
                    source={require('../assests/details.jpg')}
                    style={styles.logoConsignment}
                  />
                  <Text style={styles.boxtext}>Running Trips</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: 'space-evenly',
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
            
              </View>
              <View
                style={{
                  justifyContent: 'space-evenly',
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
               
              </View>
              <View
                style={{
                  justifyContent: 'space-evenly',
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
               
              </View>
              <View
                style={{
                  justifyContent: 'space-evenly',
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    width: '80%',
                    height: 100,
                    // aspectRatio: 1,
                    backgroundColor: '#fefbf0',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 5,

                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 14,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    navigation.navigate('Report');
                  }}>
                  <Image
                    source={require('../assests/Report.webp')}
                    style={[styles.logoConsignment,{height:80,width:80}]}
                  />
                  <Text style={styles.boxtext}>Reports</Text>
                </TouchableOpacity>
              </View>
            </View>

            



            <View style={[styles.content,{}]}>
             
              {/* <View
                style={{
                  justifyContent: 'space-evenly',
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={{
                    width: '80%',
                    height: 100,
                    // aspectRatio: 1,
                    backgroundColor: '#fefbf0',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 5,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 14,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    navigation.navigate('fueldetails');
                  }}>
                  <Image
                    source={require('../assests/fueldetails.png')}
                    style={styles.logoConsignment}
                  />
                  <Text style={styles.boxtext}>Fuel Details</Text>
                </TouchableOpacity>
              </View> */}
              <View
                style={{
                  justifyContent: 'space-evenly',
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
            
              </View>
              <View
                style={{
                  justifyContent: 'space-evenly',
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
               
              </View>
              <View
                style={{
                  justifyContent: 'space-evenly',
                  width: '100%',
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
               
              </View>
            </View>
            <Text
              style={{color: textcolor, fontFamily: 'PoppinsBold', fontSize: 11,marginBottom:5}}>
              Powered By Tranzol
            </Text>
          </View>
        </ScrollView>
      </View>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems:'center'
  },
  scrollContainer: {
    flexGrow: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  HeaderText: {
    top: 13,
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  header: {
    height: 60,
    borderBottomEndRadius: 150,
    borderBottomStartRadius: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  headerFirst: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
  },
  

  logo: {
    width: 60,
    height: 60,
  },
  logoConsignment: {
    width: 100,
    height: 80,
    marginLeft: 20,
    // borderRadius: 30,
    // backgroundColor:"red"
  },
  logomenu: {
    width: 25,
    tintColor: 'white',
    height: 25,
    // marginRight:"1%",
  },
  content: {
    flex: 1,
    width: '100%',
   
    marginTop: 40,
    alignItems: 'flex-start',

    flexDirection: 'column',
    // backgroundColor:"red"
  },
  
  row2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  box: {
    width: '55%', // Adjust based on your design
    aspectRatio: 1, // To maintain a square aspect ratio, adjust as needed
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    // margin: '5%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 14,
  },
  boxtext: {
    // marginTop: '5%',
    fontSize: 18,
    marginRight: 20,
    // textAlign:"center",
    color: '#415a77',
    fontFamily: 'PoppinsBold',
    // backgroundColor: 'red',
    width: '50%',
    fontWeight:'bold'
  },
  footer: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  FooterText: {
    fontStyle: 'italic',
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Dashboard;