// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/screen/Splash';
import LoginPage from './src/screen/Login';
import Dashboard from './src/screen/Dashboard';
import ManageDrivers from './src/screen/ManageDrivers';
import Report from './src/screen/Report';
import DriverList from './src/screen/DriverList';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={Splash}
          options={{headerShown: false}}
        />
       <Stack.Screen 
       name='login'
       component={LoginPage}
       options={{headerShown: false}}
       />
       <Stack.Screen 
       name='Dashboard'
       component={Dashboard}
       options={{headerShown:false}}
       />
       <Stack.Screen
       name='managedriver'
       component={ManageDrivers}
       options={{headerShown:false}}
       />
       <Stack.Screen 
       name='Report'
       component={Report}
       options={{headerShown:false}}
       />
       <Stack.Screen
       name='driverlist'
       component={DriverList}
       options={{headerShown:false}}
       />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;