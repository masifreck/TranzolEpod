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
  const [isLoading, setIsLoading] = useState(false);
 
  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setModalMessage('');
  };

  const validation = () => {
    if (!username.trim()) {
      setModalMessage('Please Enter Username');
      setIsModalVisible(true);
      return false;
    }
    if (!password.trim()) {
      setModalMessage('Please Enter Password');
      setIsModalVisible(true);
      return false;
    }
    return true;
  };

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

        <View style={styles.loginContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText1}>Proceed with your</Text>
            <Text style={styles.headerText2}>Login</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                style={styles.passwordInput}
              />
              <TouchableOpacity onPress={handlePasswordToggle}>
                <Icon
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  size={24}
                  color={textcolor}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={()=>{navigation.navigate('Dashboard')}}
              disabled={isLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? 'Loading...' : 'SUBMIT'}
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