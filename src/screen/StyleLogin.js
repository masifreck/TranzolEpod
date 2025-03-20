import { StyleSheet } from 'react-native';
import { screenHeight, textcolor ,primarycolor} from '../components/constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  logo: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  logoText: {
    fontSize: 17,
    fontFamily: 'PoppinsExtraBold',
    color: 'white',
    marginLeft: '5%',
    letterSpacing: 1,
  },
  loginContainer: {
    backgroundColor: 'white',
    height: screenHeight * 0.52,
    width: '100%',
    marginTop: 'auto',
    //borderTopRightRadius: 20,
    borderTopLeftRadius: 60,
    elevation: 4,
  },
  header: {
    marginLeft: 30,
    marginTop: 50,
  },
  headerText1: {
    fontSize: 32,
    color: textcolor,
  },
  headerText2: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -3,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 30,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 20,
    paddingHorizontal: 20,
    color: textcolor,
  },
  passwordContainer: {
    width: '80%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  passwordInput: {
    flex: 1,
    color: textcolor,
  },
  submitButton: {
    backgroundColor: primarycolor,
    width: '80%',
    height: 50,
    borderRadius: 20,
    elevation: 4,
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  footerText: {
    color: textcolor,
    fontSize: 11,
    bottom: 10,
    textAlign: 'center',
  },
});

export default styles;