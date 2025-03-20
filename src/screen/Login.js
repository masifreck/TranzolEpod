import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,BackHandler, Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  primarycolor,
  secondarcolor,
  textcolor,
} from '../components/constant';
import styles from './StyleLogin';
import ResponseModal from '../components/modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
 
  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setModalMessage('');
  };

  const validation = () => {
    if (!username.trim()) {
      setModalMessage('Please Enter Mobile No');
      setIsModalVisible(true);
      return false;
    }
    if (username.length !== 10 || !/^\d{10}$/.test(username)) {
      setModalMessage("Please enter a valid 10-digit mobile number");
      setIsModalVisible(true);
      return;
    }
    return true;
  };

  const sendOtp = async () => {
    if (!validation()) return;
    setLoading(true);
    try {
      const response = await fetch("https://trackme.tranzol.com/Services/TrackMe/Login/SendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ TelephoneNo: username }),
      });

      const data = await response.json();
      setLoading(false);
console.log(data)
      if (data.Success) {
       // Alert.alert("Success", data.Message);
        setModalMessage(`success: ${data.Message}`);
        navigation.navigate('verifyotp',{username});
      } else {
        //Alert.alert("Error", "Failed to send OTP.");
        setModalMessage(`Error: ${data.Message}`);
      }
    } catch (error) {
      setLoading(false);
      setModalMessage(`Error: ${error.Message}`);
    } finally {
      setIsModalVisible(true);
      
    }
  }


  const handleSubmit = async () => {
    if (!validation()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        'https://ssel.tranzol.com/api/v2/Authenticate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            u: username, // Replace with username key 'u'
            p: password, // Replace with password key 'p'
          }),
        }
      );

      const result = await response.text(); // Reading response as plain text

      if (result === '"SUCCESS"') { // Check for exact "SUCCESS" with quotes
        await AsyncStorage.setItem('success', result);
        navigation.navigate('Dashboard')
        setModalMessage('Login Successfully');
      } else {
        setModalMessage('Invalid username or password');
      }
    } catch (error) {
      setModalMessage(`Error: ${error.message}`);
    } finally {
      setIsModalVisible(true);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LinearGradient
        colors={[primarycolor, secondarcolor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assests/tranzol.png')}
            alt="logo"
          />
          <Text style={styles.logoText}>TRANZOL</Text>
        </View>
        <View style={{marginLeft:'auto',marginRight:'auto',alignItems:'center',backgroundColor:'rgba(0,0,0,0.1)',borderRadius:125,margin:10}}>
        <Image 
style={{width:250,height:250}}
source={require('../assests/otpicon.png')}/>

        </View>

        <View style={styles.loginContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText1}>Proceed with your</Text>
            <Text style={styles.headerText2}>Mobile No.</Text>
            <Text style={{textAlign:'left',color:'black',fontSize:16,margin:10}}>We need to send OTP to authenticate your mobile no.</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Mobile No."
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              keyboardType='numeric'
            />
       
            <TouchableOpacity
              style={styles.submitButton}
              onPress={()=>{navigation.navigate('verifyotp',{username:username});}}
              disabled={isLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? 'Loading...' : 'Generate OTP'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>Powered by Tranzol</Text>
        </View>
      </LinearGradient>
      <ResponseModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        responseText={modalMessage}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginPage;