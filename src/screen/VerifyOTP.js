import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { primarycolor,secondarcolor} from '../components/constant';
import ResponseModal from '../components/modal';
import LinearGradient from 'react-native-linear-gradient';
const VerifyOTP = ({ navigation,route }) => {
  const [otp, setOtp] = useState(['', '', '', '','','']);
  const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
  const [timer, setTimer] = useState(30);
  const inputs = useRef([]);
  const username = route.params?.username;
//console.log('phone',username)
const [loading, setLoading] = useState(false);
;

  const handleModalClose = () => {
    setIsModalVisible(false);
    setModalMessage('');
  };
  const isValidOtp = (otp) => {
    if(otp.join("").length === 6 && /^\d{6}$/.test(otp.join(""))){
    setModalMessage('Please Enter Six Digit OTP');
    setIsModalVisible(true);
    return false;}
    return true;
  };
  
const handleVerify = async () => {
    if (!isValidOtp(otp)) return;
  setLoading(true);
  try {
    const response = await fetch("https://trackme.tranzol.com/Services/TrackMe/Login/VerifyOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TelephoneNo: username,
        Otp: otp.join(""), // Convert OTP array to string
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.Success) {
      console.log("OTP Verified Successfully");
      setModalMessage(`Error: ${data.Message}`);
      // Navigate to next screen if needed
    } else {
      console.log("Error:", data.Message);
      setModalMessage(`Error: ${data.Message}`);
      // Show error message (You can use a modal or Toast)
    }
  } catch (error) {
    setLoading(false);
    setModalMessage(`Error: ${error.Message}`);
    console.log("Network Error:", error);
  }  finally {
    setIsModalVisible(true);
    
  }
};
  useEffect(() => {
    // Timer for OTP resend
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleResendOtp = () => {
    if (timer === 0) {
      setTimer(60);
      // Logic to resend OTP
      console.log('Resend OTP');
    }
  };

 
  return (
    <LinearGradient
        colors={[primarycolor, secondarcolor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{flex:1}}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
        <View style={{marginLeft:'auto',marginRight:'auto',alignItems:'center',backgroundColor:'rgba(0,0,0,0.1)',borderRadius:120,padding:30}}>
              <Image 
      style={{width:200,height:200}}
      source={require('../assests/OTPverification.png')}/>
      
              </View>
    <View style={styles.container}>
      

      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Enter the verification code we just sent on your phone number <Text
      style={{color:'black',fontWeight:'bold'}}>{username}</Text></Text>

      {/* OTP Input Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            ref={(ref) => (inputs.current[index] = ref)}
          />
        ))}
      </View>

      {/* Verify Button */}
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify} disabled={loading}>
  {loading ? (
    <ActivityIndicator color="#FFFFFF" />
  ) : (
    <Text style={styles.verifyButtonText}>Verify</Text>
  )}
</TouchableOpacity>


      {/* Resend OTP Section */}
      <Text style={styles.resendText}>
        Resend OTP in {timer} s
      </Text>
      <TouchableOpacity onPress={handleResendOtp} disabled={timer > 0}>
        <Text style={[styles.resendLink, timer > 0 && styles.disabledResendLink]}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
    <ResponseModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        responseText={modalMessage}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:'auto',
    padding: 24,
    paddingTop:50,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius:60
  },
  backButton: {
    marginBottom: 20,
    margin:10
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: primarycolor,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
  verifyButton: {
    backgroundColor: primarycolor,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendText: {
    textAlign: 'center',
    color: '#A9A9A9',
    fontSize: 14,
    marginBottom: 10,
  },
  resendLink: {
    textAlign: 'center',
    color: '#1E90FF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  disabledResendLink: {
    color: '#A9A9A9',
  },
});

export default VerifyOTP;
